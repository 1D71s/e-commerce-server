import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from 'typeorm';
import { AdminUserEntity } from '../entities/admin.entity';

@Injectable()
export class AdminUserRepository {
    constructor(
      @InjectRepository(AdminUserEntity)
      private readonly repository: Repository<AdminUserEntity>
    ) {}

    async getOne(options: FindOneOptions<AdminUserEntity>, withPassword: boolean = false): Promise<AdminUserEntity> {
        if (withPassword) {
            return this.repository.findOne({
                ...options,
                select: ['id', 'email', 'password', 'name', 'createdAt', 'role'],
            });
        }

        return this.repository.findOne(options);
    }

    async getMany(): Promise<AdminUserEntity[]> {
        return this.repository.find();
    }

    create(user: Partial<AdminUserEntity>): AdminUserEntity {
        return this.repository.create(user);
    }

    save(user: AdminUserEntity): Promise<AdminUserEntity> {
        return this.repository.save(user);
    }

    merge(target: AdminUserEntity, source: Partial<AdminUserEntity>): AdminUserEntity {
        return this.repository.merge(target, source);
    }

    async remove(user: AdminUserEntity): Promise<void> {
        await this.repository.remove(user);
    }
}