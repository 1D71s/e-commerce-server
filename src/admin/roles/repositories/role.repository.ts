import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RoleEntity } from "../entities/role.entity";

@Injectable()
export class RoleRepository {
    constructor(
      @InjectRepository(RoleEntity) private readonly repository: Repository<RoleEntity>
    ) {}

    async findByFields(fields: Partial<RoleEntity>): Promise<RoleEntity> {
        return this.repository.findOne({
            where: fields,
        });
    }

    async findAll(): Promise<RoleEntity[]> {
        return this.repository.find();
    }

    async create(data: Partial<RoleEntity>): Promise<RoleEntity> {
        const access = this.repository.create(data);
        return this.save(access);
    }

    async save(data: Partial<RoleEntity>): Promise<RoleEntity> {
        return this.repository.save(data);
    }
}