import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { add } from 'date-fns';
import { SessionRepository } from '../repositories/session.repository';
import { SessionEntity } from 'src/sessions/entities/session.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class SessionsService {
    constructor(
        private readonly sessionRepository: SessionRepository,
    ) {}

    public async getOrUpdateRefreshToken(user: UserEntity, agent: string): Promise<SessionEntity> {
        const existingToken = await this.sessionRepository.getOne({
            where: { user: { id: user.id }, userAgent: agent },
        });

        if (existingToken) {
            existingToken.token = uuidv4();
            existingToken.exp = add(new Date(), { days: 15 });
            return this.sessionRepository.save(existingToken);
        }

        const newToken = this.sessionRepository.create({
            token: uuidv4(),
            exp: add(new Date(), { months: 1 }),
            user,
            userAgent: agent,
        });

        return this.sessionRepository.save(newToken);
    }
}