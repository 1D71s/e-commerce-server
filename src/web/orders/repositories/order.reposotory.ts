import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';

@Injectable()
export class OrderRepository {
    constructor(
      @InjectRepository(OrderEntity)
      private readonly repository: Repository<OrderEntity>,
    ) {}

    async getOne(options: FindOneOptions<OrderEntity>): Promise<OrderEntity | null> {
        return this.repository.findOne(options);
    }

    async getMany(options?: FindOneOptions<OrderEntity>): Promise<OrderEntity[]> {
        return this.repository.find(options);
    }

    async create(orderData: Partial<OrderEntity>): Promise<OrderEntity> {
        const order = this.repository.create(orderData);
        return this.save(order);
    }

    async update(id: number, data: Partial<OrderEntity>): Promise<OrderEntity> {
        await this.repository.update(id, data);
        return this.repository.findOneOrFail({ where: { id } });
    }

    async save(data: OrderEntity): Promise<OrderEntity> {
        return this.repository.save(data);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected > 0;
    }
}
