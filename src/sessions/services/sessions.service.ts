import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from 'src/sessions/entities/token.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { add } from 'date-fns';

@Injectable()
export class SessionsService {
    constructor(
        @InjectRepository(TokenEntity) private readonly tokenRepository: Repository<TokenEntity>,
    ) { }
    
    async getOneByToken(token: string): Promise<TokenEntity> {
        return this.tokenRepository.findOne({ where: { token } });
    }

    async deleteToken(session: TokenEntity): Promise<void> {
        await this.tokenRepository.delete({ id: session.id });
    }

    public async getOrUpdateRefreshToken(id: number, agent: string): Promise<TokenEntity> {
        const existingToken = await this.tokenRepository.findOne({
            where: { userId: id, userAgent: agent },
        });

        if (existingToken) {
            existingToken.token = uuidv4();
            existingToken.exp = add(new Date(), { days: 15 });
            return this.tokenRepository.save(existingToken);
        }

        const newToken = this.tokenRepository.create({
            token: uuidv4(),
            exp: add(new Date(), { months: 1 }),
            userId: id,
            userAgent: agent,
        });

        return this.tokenRepository.save(newToken);
    }
}
