import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { IFindUserOptions } from "../interfaces/find-user-options.interface";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>
    ) {}

    async findById(id: number, options?: IFindUserOptions): Promise<UserEntity | null> {
        const { includePassword = false, relations = [] } = options || {};

        const query = this.repository.createQueryBuilder('user')
            .where('user.id = :id', { id });

        if (includePassword) {
            query.addSelect('user.password');
        }

        if (relations.includes('role')) {
            query.leftJoinAndSelect('user.role', 'role');
        }

        if (relations.includes('role.accesses')) {
            if (!relations.includes('role')) {
                query.leftJoinAndSelect('user.role', 'role');
            }
            query.leftJoinAndSelect('role.accesses', 'accesses');
        }

        for (const relation of relations) {
            if (relation !== 'role' && relation !== 'role.accesses') {
                query.leftJoinAndSelect(`user.${relation}`, relation);
            }
        }

        return query.getOne();
    }

    async findByEmail(email: string, options?: IFindUserOptions): Promise<UserEntity | null> {
        const { includePassword = false, relations = [] } = options || {};

        const query = this.repository.createQueryBuilder('user')
            .where('user.email = :email', { email });

        if (includePassword) {
            query.addSelect('user.password');
        }

        for (const relation of relations) {
            query.leftJoinAndSelect(`user.${relation}`, relation);
        }

        return query.getOne();
    }

    async findAll(): Promise<UserEntity[]> {
        return this.repository.find({
            select: ['id', 'email', 'name', 'createdAt', 'role', 'provider'],
        });
    }    

    create(user: Partial<UserEntity>): UserEntity {
        return this.repository.create(user);
    }

    save(user: UserEntity): Promise<UserEntity> {
        return this.repository.save(user);
    }

    merge(target: UserEntity, source: Partial<UserEntity>): UserEntity {
        return this.repository.merge(target, source);
    }

    async remove(user: UserEntity): Promise<void> {
        await this.repository.remove(user);
    }
}