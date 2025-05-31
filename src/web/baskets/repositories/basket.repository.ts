import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from 'typeorm';
import { CartItemEntity } from '../entities/cart-item.entity';

@Injectable()
export class BasketRepository {
    constructor(
      @InjectRepository(CartItemEntity) private readonly repository: Repository<CartItemEntity>
    ) {}

    async getOne(options: FindOneOptions<CartItemEntity>): Promise<CartItemEntity> {
        return this.repository.findOne(options);
    }

    async getMany(options: FindOneOptions<CartItemEntity>): Promise<CartItemEntity[]> {
        return this.repository.find(options);
    }

    async create(data: Partial<CartItemEntity>): Promise<CartItemEntity> {
        return this.repository.create(data);
    }

    async update(id: number, data: Partial<CartItemEntity>): Promise<CartItemEntity> {
        await this.repository.update(id, data);
        return this.repository.findOneOrFail({ where: { id } });
    }

    async save(token: CartItemEntity): Promise<CartItemEntity> {
        return this.repository.save(token);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete({ id });
    }
}