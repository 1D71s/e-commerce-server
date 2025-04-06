import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from '../dto/requests/register.dto';
import { TokenEntity } from '../../sessions/entities/token.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtService } from "@nestjs/jwt";
import { AccessToken, Tokens } from '../dto/responses/tokens.response';
import { GoogleUser } from '../interfaces/google-user.interface';
import { Provider } from 'src/users/entities/enums/provider.enum';
import { Response } from "express";
import { compareSync } from 'bcrypt';
import { LoginDto } from '../dto/requests/login.dto';
import { SessionsService } from 'src/sessions/services/sessions.service';
import { TokenRepository } from 'src/sessions/repositories/token.repository';
import { UserRepository } from 'src/users/repositories/user.repository';
import { genSaltSync, hashSync } from 'bcrypt';
import { REFRESH_TOKEN } from '../variables';

@Injectable()
export class AuthService {
    constructor(
        private readonly sessionsService: SessionsService,
        private readonly jwtService: JwtService,
        private readonly userRepository: UserRepository,
        private readonly tokenRepository: TokenRepository,
    ) { }

    async register(dto: RegisterDto) {
        const user = await this.userRepository.findOneByEmail(dto.email);

        if (user) {
            throw new ConflictException('this email is used');
        }

        const hashPassword = dto?.password ? this.hashPassword(dto.password) : null

        return this.userRepository.create({
            ...dto, password: hashPassword
        });
    }

    async login(dto: LoginDto, agent: string): Promise<Tokens> {
        const user = await this.userRepository.findOneByEmail(dto.email, true);

        if (!user) {
            throw new NotFoundException("User was not found")
        }

        if (user.provider || !compareSync(dto.password, user.password)) {
            throw new UnauthorizedException('Incorrect email or password.');
        }

        return this.generateTokens(user, agent);
    }

    async deleteRefreshToken(refreshToken: TokenEntity): Promise<void> {
        return this.tokenRepository.deleteToken(refreshToken);
    }

    async updateRefreshTokens(refreshToken: TokenEntity, agent: string): Promise<Tokens> {
        const token = await this.tokenRepository.getBy({
            token: refreshToken.token
        })

        if (!token || new Date(token.exp) < new Date()) {
            throw new UnauthorizedException('Token is not valide or did not found');
        }
        
        await this.tokenRepository.deleteToken(refreshToken);

        const user = await this.userRepository.findOne({ 
            where: { id: token.userId } 
        });

        return this.generateTokens(user, agent);
    }

    async googleAuth(googleUser: GoogleUser, agent: string): Promise<Tokens> {
        const { email } = googleUser;
    
        const userExist = await this.userRepository.findOneByEmail(email);
    
        if (userExist) {
            if (userExist.provider !== Provider.GOOGLE) {
                throw new BadRequestException(
                    `User with email ${email} already exists, but with a different provider.`
                );
            }
    
            return this.generateTokens(userExist, agent);
        }
    
        const newUser = this.userRepository.create({
            email,
            provider: Provider.GOOGLE,
        });
    
        try {
            const savedUser = await this.userRepository.save(newUser);
    
            if (!savedUser) {
                throw new BadRequestException(
                    `Failed to create a user with email ${email} in Google auth`
                );
            }
    
            return this.generateTokens(savedUser, agent);
        } catch (error) {
            throw new InternalServerErrorException(
                `Error occurred while saving user with email ${email}.`
            );
        }
    }    

    async sendRefreshTokenToCookies(tokens: Tokens, res: Response): Promise<AccessToken> {
        if (!tokens) {
            throw new UnauthorizedException()
        }

        res.cookie(REFRESH_TOKEN, tokens.refreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(tokens.refreshToken.exp),
            path: '/'
        })

        return { accessToken: tokens.accessToken }
    }

    private async generateTokens(user: UserEntity, agent: string): Promise<Tokens> {
        const refreshToken = await this.sessionsService.getOrUpdateRefreshToken(user.id, agent);
        
        const accessToken = this.jwtService.sign({
            id: user.id,
            email: user.email,
            session: refreshToken.token,
            role: user.role
        });

        return { accessToken, refreshToken };
    }

    private hashPassword(password: string): string {
        return hashSync(password, genSaltSync(10))
    }
}
