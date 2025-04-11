import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindOneOptions } from "typeorm";
import { SessionEntity } from "../entities/session.entity";

@Injectable()
export class SessionRepository {
    constructor(
        @InjectRepository(SessionEntity)
        private readonly repository: Repository<SessionEntity>,
    ) {}

    async getOne(options: FindOneOptions<SessionEntity>): Promise<SessionEntity | null> {
        return this.repository.findOne(options);
    }

    create(data: Partial<SessionEntity>): SessionEntity {
        return this.repository.create(data);
    }

    save(token: SessionEntity): Promise<SessionEntity> {
        return this.repository.save(token);
    }

    async deleteToken(token: string): Promise<void> {
        await this.repository.delete({ token });
    }
}
