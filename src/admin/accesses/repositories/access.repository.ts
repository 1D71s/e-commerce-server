import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AccessEntity } from '../entities/access.entity';

@Injectable()
export class AccessRepository {
    constructor(
      @InjectRepository(AccessEntity) private readonly repository: Repository<AccessEntity>
    ) {}

    async findById(id: number): Promise<AccessEntity | null> {
        return this.repository.findOne({ where: { id } });
    }

    async findAll(): Promise<AccessEntity[]> {
        return this.repository.find();
    }

    async create(data: Partial<AccessEntity>): Promise<AccessEntity> {
        const access = this.repository.create(data);
        return this.repository.save(access);
    }
}