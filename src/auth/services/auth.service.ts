import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from '../dto/requests/register.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtService } from "@nestjs/jwt";
import { IAccessToken, ISessionAndAccessToken, ITokens } from '../dto/responses/tokens.response';
import { GoogleUser } from '../interfaces/google-user.interface';
import { Provider } from 'src/users/interfaces/enums/provider.enum';
import { Response } from "express";
import { compareSync } from 'bcrypt';
import { LoginDto } from '../dto/requests/login.dto';
import { SessionsService } from 'src/sessions/services/sessions.service';
import { SessionRepository } from 'src/sessions/repositories/session.repository';
import { UserRepository } from 'src/users/repositories/user.repository';
import { genSaltSync, hashSync } from 'bcrypt';
import { REFRESH_TOKEN } from '../variables';

@Injectable()
export class AuthService {
    constructor(
        private readonly sessionsService: SessionsService,
        private readonly jwtService: JwtService,
        private readonly userRepository: UserRepository,
        private readonly sessionRepository: SessionRepository,
    ) { }

    async register(dto: RegisterDto) {
        const user = await this.userRepository.findByEmail(dto.email);

        if (user) {
            throw new ConflictException('this email is used');
        }

        const hashPassword = dto?.password ? this.hashPassword(dto.password) : null

        const newUser = this.userRepository.create({
            ...dto, password: hashPassword
        });

        return this.userRepository.save(newUser);
    }

    async login(dto: LoginDto, agent: string): Promise<ISessionAndAccessToken> {
        const { email, password } = dto;
        const user = await this.userRepository.findByEmail(email, { includePassword: true });

        if (!user) {
            throw new NotFoundException("User was not found")
        }

        if (user.provider || !compareSync(password, user.password)) {
            throw new UnauthorizedException('Incorrect email or password.');
        }

        return this.generateTokens(user, agent);
    }

    async deleteRefreshToken(token: string): Promise<void> {
        return this.sessionRepository.deleteToken(token);
    }

    async updateRefreshTokens(refreshToken: string, agent: string): Promise<ISessionAndAccessToken> {
        const token = await this.sessionRepository.getOne({
            where: { token: refreshToken },
            relations: [ 'user' ],
        })

        if (!token || new Date(token.exp) < new Date()) {
            throw new UnauthorizedException('Token is not valide or did not found');
        }
        
        await this.sessionRepository.deleteToken(refreshToken);

        const user = await this.userRepository.findById(token.user.id);

        return this.generateTokens(user, agent);
    }

    async googleAuth(googleUser: GoogleUser, agent: string): Promise<ISessionAndAccessToken> {
        const { email } = googleUser;
    
        const userExist = await this.userRepository.findByEmail(email);
    
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

    async sendRefreshTokenToCookies(tokens: ISessionAndAccessToken, res: Response): Promise<IAccessToken> {
        if (!tokens) {
            throw new UnauthorizedException()
        }

        res.cookie(REFRESH_TOKEN, tokens.session.token, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(tokens.session.exp),
            path: '/'
        })

        return { accessToken: tokens.accessToken }
    }

    private async generateTokens(user: UserEntity, agent: string): Promise<ISessionAndAccessToken> {
        const session = await this.sessionsService.getOrUpdateRefreshToken(user, agent);
        
        const accessToken = this.jwtService.sign({
            id: user.id,
            email: user.email,
            session: session.token,
            role: user.role
        });

        return { accessToken, session };
    }

    private hashPassword(password: string): string {
        return hashSync(password, genSaltSync(10))
    }
}
