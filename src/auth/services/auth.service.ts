import { BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from '../dto/requests/register.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtService } from "@nestjs/jwt";
import { IAccessToken, ISessionAndAccessToken } from '../dto/responses/tokens.response';
import { GoogleUser } from '../interfaces/google-user.interface';
import { Provider } from 'src/users/interfaces/enums/provider.enum';
import { Response } from "express";
import { compareSync } from 'bcrypt';
import { LoginDto } from '../dto/requests/login.dto';
import { SessionsService } from 'src/sessions/services/sessions.service';
import { SessionRepository } from 'src/sessions/repositories/session.repository';
import { UserRepository } from 'src/users/repositories/user.repository';
import { genSaltSync, hashSync } from 'bcrypt';
import { IMessage } from 'src/common/dto/responses/message.response';
import { REFRESH_TOKEN } from 'src/common/variables';
import { IJwtPayload } from '../interfaces/jwt-payload-user.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly sessionsService: SessionsService,
        private readonly jwtService: JwtService,
        private readonly userRepository: UserRepository,
        private readonly sessionRepository: SessionRepository,
    ) { }

    async register(dto: RegisterDto): Promise<IMessage> {
        const user = await this.userRepository.findByEmail(dto.email);

        if (user) {
            throw new ConflictException('this email is used');
        }

        const hashPassword = dto?.password ? this.hashPassword(dto.password) : null

        const newUser = this.userRepository.create({
            ...dto, password: hashPassword
        });

        await this.userRepository.save(newUser);
        
        return { message: 'User was created' };
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

    async deleteRefreshToken(token: string, agent: string): Promise<void> {
        const session = await this.sessionRepository.getOne({
            where: { token },
            relations: [ 'user' ],
        })

        if (!session) {
            throw new NotFoundException('Session was not found');
        }

        return this.sessionsService.removeSession(session, agent);
    }

    async updateRefreshTokens(refreshToken: string, agent: string): Promise<ISessionAndAccessToken> {
        const session = await this.sessionRepository.getOne({
            where: { token: refreshToken },
            relations: [ 'user' ],
        })

        if (!session || new Date(session.exp) < new Date()) {
            throw new UnauthorizedException('Token is not valide or did not found');
        }
        
        await this.sessionsService.removeSession(session, agent);

        const user = await this.userRepository.findById(session.user.id);

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

        this.sessionsService.addSessionToCache(session, agent);

        const tokenPayload: IJwtPayload = {
            id: user.id,
            email: user.email,
            refreshToken: session.token,
            role: user.role,
        };
        
        const accessToken = this.jwtService.sign(tokenPayload);

        return { accessToken, session };
    }

    private hashPassword(password: string): string {
        return hashSync(password, genSaltSync(10))
    }
}