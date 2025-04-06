import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { ResetToken } from "../entities/reset-token.entity";

@Injectable()
export class ResetTokenRepository {
    constructor(
        @InjectRepository(ResetToken)
        private readonly resetTokenRepository: Repository<ResetToken>
    ) {}

    async findOneByToken(token: string): Promise<ResetToken | null> {
        return this.resetTokenRepository.findOne({
            where: { token },
        });
    }

    async findByUserIdAndAgent(userId: number, userAgent: string): Promise<ResetToken[]> {
        return this.resetTokenRepository.find({
            where: { userId, userAgent },
        });
    }

    async deleteByConditions(conditions: Partial<ResetToken>): Promise<DeleteResult> {
        return this.resetTokenRepository.delete(conditions);
    }

    async save(resetToken: ResetToken): Promise<ResetToken> {
        return this.resetTokenRepository.save(resetToken);
    }

    async deleteByUserIdAndAgent(userId: number, userAgent: string): Promise<void> {
        await this.resetTokenRepository.delete({ userId, userAgent });
    }
}
