import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, FindOneOptions, Repository } from "typeorm";
import { ResetToken } from "../entities/reset-token.entity";

@Injectable()
export class ResetTokenRepository {
    constructor(
        @InjectRepository(ResetToken)
        private readonly repository: Repository<ResetToken>
    ) {}

    async getOne(options: FindOneOptions<ResetToken>): Promise<ResetToken | null> {
        return this.repository.findOne(options);
    }

    async getUsersAll(options: FindOneOptions<ResetToken>): Promise<ResetToken[]> {
        return this.repository.find(options);
    }

    async deleteByConditions(conditions: Partial<ResetToken>): Promise<DeleteResult> {
        return this.repository.delete(conditions);
    }

    async create(resetTokenData: Partial<ResetToken>): Promise<ResetToken> {
        return this.repository.create(resetTokenData);
    }

    async save(resetToken: ResetToken): Promise<ResetToken> {
        return this.repository.save(resetToken);
    }
}
