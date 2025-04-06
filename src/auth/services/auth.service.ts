import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from '../dto/requests/register.dto';
import { TokenEntity } from '../../sessions/entities/token.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtService } from "@nestjs/jwt";
import { AccessToken, Tokens } from '../dto/responses/tokens.response';
import { GoogleUser } from '../interfaces/google-user.interface';
import { UsersService } from 'src/users/services/users.service';
import { Provider } from 'src/users/entities/enums/provider.enum';
import { Response } from "express";
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { LoginDto } from '../dto/requests/login.dto';
import { SessionsService } from 'src/sessions/services/sessions.service';
import { MailerService } from 'src/mailer/services/mailer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResetToken } from '../entities/reset-token.entity';
import { v4 as uuidv4 } from 'uuid';
import { MessageInterface } from 'src/common/dto/responses/message.response';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(ResetToken) private resetTokenRepository: Repository<ResetToken>,
        private readonly sessionsService: SessionsService,
        private readonly jwtService: JwtService,
        private readonly userService: UsersService,
        private readonly mailerService: MailerService
    ) { }

    async register(dto: RegisterDto) {
        const user = await this.userService.getOneByEmail(dto.email);

        if (user) {
            throw new ConflictException('this email is used');
        }

        const hashPassword = dto?.password ? this.hashPassword(dto.password) : null

        return this.userService.create({
            ...dto, password: hashPassword
        });
    }

    async login(dto: LoginDto, agent: string): Promise<Tokens> {
        const user = await this.userService.getOneByEmail(dto.email, true);

        if (!user) {
            throw new NotFoundException("User was not found")
        }

        if (user.provider || !compareSync(dto.password, user.password)) {
            throw new UnauthorizedException('Incorrect email or password.');
        }

        return this.generateTokens(user, agent);
    }

    async deleteRefreshToken(refreshToken: TokenEntity): Promise<TokenEntity> {
        const tokenToDelete = await this.sessionsService.getOneByToken(refreshToken.token)

        if (!tokenToDelete) {
            throw new NotFoundException("Token Doesn't found!");
        }

        return this.sessionsService.getOneByToken(refreshToken.token)
    }

    async updateRefreshTokens(refreshToken: TokenEntity, agent: string): Promise<Tokens> {
        const token = await this.sessionsService.getOneByToken(refreshToken.token)

        if (!token || new Date(token.exp) < new Date()) {
            throw new UnauthorizedException('Token is not valide or did not found');
        }
        
        await this.sessionsService.deleteToken(token)

        const user = await this.userService.getOneById(token.userId);

        return this.generateTokens(user, agent);
    }

    async googleAuth(googleUser: GoogleUser, agent: string): Promise<Tokens> {

        const { email } = googleUser;

        const userExist = await this.userService.getOneByEmail(email)

        if (userExist) {
            return this.generateTokens(userExist, agent)
        }

        const user = await this.userService.create({
            email,
            provider: Provider.GOOGLE
        })

        if (!user) {
            throw new BadRequestException(`Failed to create a user with email ${email} in Google auth`);
        }

        const newUser = await this.userService.getOneById(user.id);

        return this.generateTokens(newUser, agent);
    }

    async sendPasswordUpdateEmail(email: string, agent: string): Promise<MessageInterface> {
        const user = await this.userService.getOneByEmail(email);

        if (!user || user.provider) {
            throw new NotFoundException("User was not found!")
        }

        const checkExistReset = await this.resetTokenRepository.find({
            where: { userId: user.id, userAgent: agent }
        })

        if (checkExistReset && checkExistReset.some(item => item.exp > new Date())) {
            throw new ConflictException('Reset token already exists and is still valid.');
        }

        await this.resetTokenRepository.delete({ userId: user.id, userAgent: agent });

        const token = this.createResetToken(user.id, agent);
        
        const title = "Оновлення пароля на вашому обліковому записі";
        const html = `
            <p>Привіт!</p>
            <p>Ви отримали цей лист, оскільки ініціювали оновлення пароля для вашого облікового запису.</p>
            <p>Щоб завершити процес, будь ласка, перейдіть за наступним посиланням:</p>
            <p><a href="${process.env.CLIENT_LINK}/password/update/${token}" style="color: #007bff; text-decoration: none;">
                Оновити пароль
            </a></p>
            <p>Якщо ви не робили цей запит, просто ігноруйте цей лист. Ваш пароль не буде змінено.</p>
            <p>З найкращими побажаннями,</p>
            <p>Ваша команда підтримки</p>
        `

        await this.mailerService.sendEmail(email, title, html)
        return { message: "The code has been senе to your email" }
    }

    async changePassword(token: string, password: string): Promise<MessageInterface> {
        const checkToken = await this.validateToken(token);

        if (!checkToken) {
            throw new UnauthorizedException("Token is not valid")
        }

        const hashPassword = this.hashPassword(password);

        const update = await this.userService.changePassword(checkToken.userId, hashPassword)

        if (!update) {
            throw new BadRequestException();
        }
        await this.resetTokenRepository.delete({ id: checkToken.id })

        return { message: "Password has been updated." }
    }

    async sendRefreshTokenToCookies(tokens: Tokens, res: Response): Promise<AccessToken> {
        if (!tokens) {
            throw new UnauthorizedException()
        }

        res.cookie("REFRESH_TOKEN", tokens.refreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            expires: new Date(tokens.refreshToken.exp),
            path: '/'
        })

        return { accessToken: tokens.accessToken }
    }

    private async createResetToken(userId: number, userAgent: string): Promise<ResetToken> {
        const token = uuidv4();
    
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getMinutes() + 2);
    
        const resetToken = this.resetTokenRepository.create({
            token,
            exp: expirationDate,
            userId,
            userAgent,
        });
    
        return await this.resetTokenRepository.save(resetToken);
    }
    
    private async validateToken(token: string): Promise<ResetToken> {
        const resetToken = await this.resetTokenRepository.findOne({ where: { token } });
    
        if (!resetToken) throw new NotFoundException("Token was not found!");
    
        const currentDate = new Date();
        if (currentDate > resetToken.exp) throw new UnauthorizedException("Token is not valid!")
    
        return resetToken;
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
