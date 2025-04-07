import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindOneOptions } from "typeorm";
import { SessionEntity } from "../entities/session.entity";

@Injectable()
export class SessionRepository {
    constructor(
        @InjectRepository(SessionEntity)
        private readonly tokenRepository: Repository<SessionEntity>,
    ) {}

    async getOne(options: FindOneOptions<SessionEntity>): Promise<SessionEntity | null> {
        return this.tokenRepository.findOne(options);
    }

    create(data: Partial<SessionEntity>): SessionEntity {
        return this.tokenRepository.create(data);
    }

    save(token: SessionEntity): Promise<SessionEntity> {
        return this.tokenRepository.save(token);
    }

    async deleteToken(token: string): Promise<void> {
        await this.tokenRepository.delete({ token });
    }
}
