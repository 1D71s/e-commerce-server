import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { add } from 'date-fns';
import { SessionRepository } from '../repositories/session.repository';
import { RedisService } from 'src/redis/service/redis.service';
import { buildRedisKey } from 'src/common/utils/build-redis-key';
import { ISession } from '../interfaces/session.interface';
import { UserEntity } from 'src/web/users/entities/user.entity';
import { SessionEntity } from '../entities/session.entity';

@Injectable()
export class SessionsService {
    constructor(
        private readonly sessionRepository: SessionRepository,
        private readonly redisService: RedisService,
    ) {}

    async validateSession(id: number, token: string, userAgent: string): Promise<SessionEntity> {
        const cacheKey = this.getCacheKey(id, userAgent);

        const cachedSession = await this.redisService.get(cacheKey);

        if (cachedSession) {
            const session: SessionEntity = JSON.parse(cachedSession);
            return session
        }

        const session = await this.sessionRepository.getOne({
            where: { token },
        }); 

        return session;
    }

    async removeSession(session: ISession, userAgent: string): Promise<void> {
        const { user, token } = session;

        const cacheKey = this.getCacheKey(user.id, userAgent);

        await this.sessionRepository.delete(token);
        await this.redisService.delete(cacheKey);
    }

    async addSessionToCache(session: ISession, userAgent: string): Promise<void> {
        const cacheKey = this.getCacheKey(session.user.id, userAgent);
        
        await this.redisService.set(cacheKey, JSON.stringify(session), { EX: 604800 });
    }

    async getOrUpdateRefreshToken(user: UserEntity, agent: string): Promise<SessionEntity> {
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

    private getCacheKey(id: number, userAgent: string): string {
        return buildRedisKey(id, userAgent) 
    }
}