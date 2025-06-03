import { OrderStatus } from '../../../web/orders/enums/order-status.enum';

export class OrderFilterBuilder {
    private where: Record<string, any> = {};

    filterByUser(userId?: number): this {
        if (userId !== undefined) {
            this.where['user.id'] = userId;
        }
        return this;
    }

    filterByStatus(status?: OrderStatus): this {
        if (status !== undefined) {
            this.where['status'] = status;
        }
        return this;
    }

    filterByCreatedAtRange(startDate?: Date, endDate?: Date): this {
        if (startDate && endDate) {
            this.where['createdAt'] = { $gte: startDate, $lt: endDate };
        } else if (startDate) {
            this.where['createdAt'] = { $gte: startDate };
        } else if (endDate) {
            this.where['createdAt'] = { $lt: endDate };
        }
        return this;
    }

    build(): Record<string, any> {
        return this.where;
    }
}
