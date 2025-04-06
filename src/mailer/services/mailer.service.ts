import { BadRequestException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: process.env.GOOGLE_USER_APP, pass: process.env.GOOGLE_PASSWORD_APP, },
        });
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async sendEmail(to: string, subject: string, html: string): Promise<void> {
        if (!this.isValidEmail(to)) {
            throw new BadRequestException('Invalid email address');
        }

        const mailOptions = {
            from: process.env.GOOGLE_USER_APP,
            to,
            subject,
            html,
        };

        try {
            await this.transporter.sendMail(mailOptions); // Отправляем письмо асинхронно
        } catch (error) {
            throw new BadRequestException('Failed to send email: ' + error.message);
        }
    }
}
