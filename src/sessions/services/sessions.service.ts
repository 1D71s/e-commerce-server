import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { add } from 'date-fns';
import { TokenRepository } from '../repositories/token.repository';
import { TokenEntity } from 'src/sessions/entities/token.entity';

@Injectable()
export class SessionsService {
    constructor(
        private readonly tokenRepository: TokenRepository,
    ) {}

    public async getOrUpdateRefreshToken(id: number, agent: string): Promise<TokenEntity> {
        const existingToken = await this.tokenRepository.getBy({
            userId: id,
            userAgent: agent,
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