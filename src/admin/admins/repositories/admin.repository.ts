import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from 'typeorm';
import { AdminEntity } from '../entities/admin.entity';

@Injectable()
export class AdminRepository {
    constructor(
      @InjectRepository(AdminEntity)
      private readonly repository: Repository<AdminEntity>
    ) {}

    async getOne(options: FindOneOptions<AdminEntity>, withPassword: boolean = false): Promise<AdminEntity> {
        if (withPassword) {
            return this.repository.findOne({
                ...options,
                select: ['id', 'email', 'password', 'name', 'createdAt', 'role'],
            });
        }

        return this.repository.findOne(options);
    }

    create(user: Partial<AdminEntity>): AdminEntity {
        return this.repository.create(user);
    }

    save(user: AdminEntity): Promise<AdminEntity> {
        return this.repository.save(user);
    }

    merge(target: AdminEntity, source: Partial<AdminEntity>): AdminEntity {
        return this.repository.merge(target, source);
    }

    async remove(user: AdminEntity): Promise<void> {
        await this.repository.remove(user);
    }
}