import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from 'typeorm';
import { CartItemEntity } from '../entities/cart-item.entity';
import { ICartItem } from '../interfaces/cart-item.interface';

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

    create(data: Omit<ICartItem, 'id'>): CartItemEntity {
        return this.repository.create(data);
    }

    async update(id: number, data: Partial<CartItemEntity>): Promise<CartItemEntity> {
        await this.repository.update(id, data);
        return this.repository.findOneOrFail({ where: { id } });
    }

    async save(data: CartItemEntity): Promise<CartItemEntity> {
        return this.repository.save(data);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete({ id });
    }
}