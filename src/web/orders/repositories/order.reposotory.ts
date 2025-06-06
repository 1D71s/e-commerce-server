import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { OrderEntity } from '../entities/order.entity';
import { OrderFilterBuilder } from '../../../admin/admin-orders/services/order-query.builder';
import { GetOrdersFilterDto } from '../../../admin/admin-orders/dtos/requests/get-orders-filter.dto';

@Injectable()
export class OrderRepository {
    constructor(
      @InjectRepository(OrderEntity)
      private readonly repository: Repository<OrderEntity>,
    ) {}

    async getOne(options: FindOneOptions<OrderEntity>): Promise<OrderEntity | null> {
        return this.repository.findOne(options);
    }

    async findManyByFilters(dto: GetOrdersFilterDto): Promise<[OrderEntity[], number]> {
        const { userId, status, createdAt, take = 10, skip = 0 } = dto;

        const queryBuilder = this.repository.createQueryBuilder('orders');

        const builder = new OrderFilterBuilder(queryBuilder)
          .filterByUser(userId)
          .filterByStatus(status)
          .filterByCreatedAtRange(createdAt)
          .withPagination(skip, take);

        return await builder.build().getManyAndCount();
    }

    async update(id: number, data: Partial<OrderEntity>): Promise<OrderEntity> {
        await this.repository.update(id, data);
        return this.repository.findOneOrFail({ where: { id } });
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        return result.affected > 0;
    }
}
