import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { OrderQuantityEntity } from '../entities/order-quantity.entity';

@Injectable()
export class OrderQuantityRepository {
    constructor(
      @InjectRepository(OrderQuantityEntity)
      private readonly repository: Repository<OrderQuantityEntity>,
    ) {}

    async getOne(options: FindOneOptions<OrderQuantityEntity>): Promise<OrderQuantityEntity | null> {
        return this.repository.findOne(options);
    }

    async getMany(): Promise<OrderQuantityEntity[]> {
        return this.repository.find();
    }

    async create(orderQuantityData: Partial<OrderQuantityEntity>): Promise<OrderQuantityEntity> {
        const orderQuantity = this.repository.create(orderQuantityData);
        return this.save(orderQuantity);
    }

    async update(id: number, data: Partial<OrderQuantityEntity>): Promise<OrderQuantityEntity> {
        await this.repository.update(id, data);
        return this.repository.findOneOrFail({ where: { id } });
    }

    async save(data: OrderQuantityEntity): Promise<OrderQuantityEntity> {
        return this.repository.save(data);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected > 0;
    }
}
