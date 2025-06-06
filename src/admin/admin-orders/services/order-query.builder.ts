import { OrderStatus } from '../../../web/orders/enums/order-status.enum';
import { SelectQueryBuilder } from 'typeorm';
import { OrderEntity } from '../../../web/orders/entities/order.entity';
import { endOfDay, startOfDay } from 'date-fns';

export class OrderFilterBuilder {
    constructor(private readonly queryBuilder: SelectQueryBuilder<OrderEntity>) {}

    filterByUser(userId?: number): this {
        if (userId !== undefined) {
            this.queryBuilder.andWhere('order.user.id == :userId', { userId });
        }
        return this;
    }

    filterByStatus(status?: OrderStatus): this {
        if (status !== undefined) {
            this.queryBuilder.andWhere('order.status == :status', { status });
        }
        return this;
    }

    filterByCreatedAtRange(createdAt?: Date): this {
        const startDate = createdAt ? startOfDay(createdAt) : undefined;
        const endDate = createdAt ? endOfDay(createdAt) : undefined;

        if (startDate !== undefined) {
            this.queryBuilder.andWhere('order.createdAt >= :startDate', { startDate });
        }
        if (endDate !== undefined) {
            this.queryBuilder.andWhere('order.createdAt <= :endDate', { endDate });
        }
        return this;
    }

    withPagination(skip: number = 0, take: number = 10): this {
        this.queryBuilder.skip(skip).take(take);
        return this;
    }

    build(): SelectQueryBuilder<OrderEntity> {
        return this.queryBuilder;
    }
}
