import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindOneOptions } from "typeorm";
import { TokenEntity } from "../entities/token.entity";

@Injectable()
export class TokenRepository {
    constructor(
        @InjectRepository(TokenEntity)
        private readonly tokenRepository: Repository<TokenEntity>,
    ) {}

    async getBy(where: Partial<TokenEntity>): Promise<TokenEntity | null> {
        return this.tokenRepository.findOne({ where });
    }    

    async getOneByToken(options: FindOneOptions<TokenEntity>): Promise<TokenEntity | null> {
        return this.tokenRepository.findOne(options);
    }

    create(data: Partial<TokenEntity>): TokenEntity {
        return this.tokenRepository.create(data);
    }

    save(token: TokenEntity): Promise<TokenEntity> {
        return this.tokenRepository.save(token);
    }

    async deleteToken(session: TokenEntity): Promise<void> {
        await this.tokenRepository.delete({ id: session.id });
    }
}
