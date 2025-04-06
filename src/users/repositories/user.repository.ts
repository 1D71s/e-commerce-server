import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindOneOptions, FindManyOptions } from "typeorm";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    private prepareSelectFields(includePassword: boolean): (keyof UserEntity)[] {
        if (includePassword) {
            return [];
        }
        return ['id', 'email', 'name', 'createdAt'];
    }

    async findOne(options: FindOneOptions<UserEntity>, includePassword = false): Promise<UserEntity | null> {
        const { where, relations } = options;
        const select = this.prepareSelectFields(includePassword);

        return this.userRepository.findOne({
            where,
            relations,
            select,
        });
    }

    async findOneByEmail(email: string, includePassword = false): Promise<UserEntity | null> {
        const select = this.prepareSelectFields(includePassword);

        return this.userRepository.findOne({
            where: { email },
            select,
        });
    }

    async findAll(): Promise<UserEntity[]> {
        return this.userRepository.find({
            select: ['id', 'email', 'name', 'createdAt', 'updatedAt'] as (keyof UserEntity)[]
        });
    }

    create(user: Partial<UserEntity>): UserEntity {
        return this.userRepository.create(user);
    }

    save(user: UserEntity): Promise<UserEntity> {
        return this.userRepository.save(user);
    }

    merge(target: UserEntity, source: Partial<UserEntity>): UserEntity {
        return this.userRepository.merge(target, source);
    }

    async remove(user: UserEntity): Promise<void> {
        await this.userRepository.remove(user);
    }
}
