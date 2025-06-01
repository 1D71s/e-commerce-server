import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { OrderAddressEntity } from '../entities/order-address.entity';

@Injectable()
export class OrderAddressRepository {
    constructor(
      @InjectRepository(OrderAddressEntity)
      private readonly repository: Repository<OrderAddressEntity>,
    ) {}

    async getOne(options: FindOneOptions<OrderAddressEntity>): Promise<OrderAddressEntity | null> {
        return this.repository.findOne(options);
    }

    async getMany(options?: FindOneOptions<OrderAddressEntity>): Promise<OrderAddressEntity[]> {
        return this.repository.find(options);
    }

    async create(addressData: Partial<OrderAddressEntity>): Promise<OrderAddressEntity> {
        const address = this.repository.create(addressData);
        return this.save(address);
    }

    async update(id: number, data: Partial<OrderAddressEntity>): Promise<OrderAddressEntity> {
        await this.repository.update(id, data);
        return this.repository.findOneOrFail({ where: { id } });
    }

    async save(data: OrderAddressEntity): Promise<OrderAddressEntity> {
        return this.repository.save(data);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected > 0;
    }
}
