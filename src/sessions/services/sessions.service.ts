import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { add } from 'date-fns';
import { SessionRepository } from '../repositories/session.repository';
import { SessionEntity } from 'src/sessions/entities/session.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { RedisService } from 'src/redis/service/redis.service';
import { USER_SESSIONS } from 'src/common/variables';

@Injectable()
export class SessionsService {
    constructor(
        private readonly sessionRepository: SessionRepository,
        private readonly redisService: RedisService,
    ) {}

    async validateSession(userId: number, token: string, userAgent: string): Promise<SessionEntity> {
        const cacheKey = `${USER_SESSIONS}_${userAgent}:${userId}`;

        const cachedSession = await this.redisService.get(cacheKey);

        if (cachedSession) {
            const session: SessionEntity = JSON.parse(cachedSession);
            return session
        }

        const session = await this.sessionRepository.getOne({
            where: { token },
            relations: ['user'],
        }); 

        return session;
    }

    public async getOrUpdateRefreshToken(user: UserEntity, agent: string): Promise<SessionEntity> {
        const existingToken = await this.sessionRepository.getOne({
            where: { user: { id: user.id }, userAgent: agent },
            relations: ['user'],
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