import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { genSaltSync, hashSync } from 'bcrypt';
import { IMessage } from 'src/common/dto/responses/message.response';
import { MailerService } from 'src/mailer/services/mailer.service';
import { ResetTokenRepository } from '../repositories/reset-user.repository';
import { ResetToken } from '../entities/reset-token.entity';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from '../entities/user.entity';
import { askResetPassword } from 'src/mailer/templates/reset-passwoed-ask';

@Injectable()
export class UsersService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly mailerService: MailerService,
        private readonly resetTokenRepository: ResetTokenRepository,
    ) {}

    async sendPasswordUpdateEmail(email: string): Promise<IMessage> {
        const user = await this.userRepository.findByEmail(email);

        if (!user || user.provider) {
            throw new NotFoundException("User was not found!")
        }

        const checkExistReset = await this.resetTokenRepository.getUsersAll({
            where: { user: { id: user.id } },
        })

        if (checkExistReset && checkExistReset.some(item => item.exp > new Date())) {
            throw new ConflictException('Reset token already exists and is still valid.');
        }

        await this.resetTokenRepository.deleteByConditions({ user: user });

        const token = await this.createResetToken(user);
        
        const template = askResetPassword(token.token);

        const { title, html } = template;

        await this.mailerService.sendEmail(email, title, html)
        return { message: "The code has been send to your email" }
    }

    async changePassword(token: string, password: string): Promise<IMessage> {
        const checkToken = await this.validateToken(token);

        if (!checkToken) {
            throw new UnauthorizedException("Token is not valid")
        }

        const hashPassword = this.hashPassword(password);

        const user = await this.userRepository.findById(checkToken.user.id);
        user.password = hashPassword;
        const updatedUser = await this.userRepository.save(user);


        if (!updatedUser) {
            throw new BadRequestException();
        }
        await this.resetTokenRepository.deleteByConditions({ user });

        return { message: "Password has been updated." }
    }

    private async createResetToken(user: UserEntity): Promise<ResetToken> {
        const token = uuidv4();
    
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getMinutes() + 2);
    
        const resetToken = new ResetToken();
        resetToken.token = token;
        resetToken.exp = expirationDate;
        resetToken.user = user;

    
        return await this.resetTokenRepository.save(resetToken);
    }
    
    private async validateToken(token: string): Promise<ResetToken> {
        const resetToken = await this.resetTokenRepository.getOne({ 
            where: { token }, 
            relations: ['user'] 
        });
    
        if (!resetToken) throw new NotFoundException("Token was not found!");
    
        const currentDate = new Date();
        if (currentDate > resetToken.exp) throw new UnauthorizedException("Token is not valid!")
    
        return resetToken;
    }

    private hashPassword(password: string): string {
        return hashSync(password, genSaltSync(10))
    }
}