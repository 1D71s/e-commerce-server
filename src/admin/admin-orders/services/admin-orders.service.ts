import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderRepository } from '../../../web/orders/repositories/order.reposotory';
import { IMessage } from '../../../common/dto/responses/message.response';
import { IGetManyPagination } from '../../../web/orders/dtos/responses/get-many-pagination.response';
import { OrderEntity } from '../../../web/orders/entities/order.entity';
import { GetOrdersFilterDto } from '../dtos/requests/get-orders-filter.dto';
import { HandleOrderDto } from '../dtos/requests/handle-order.dto';

@Injectable()
export class AdminOrdersService {
    constructor(
        private readonly orderRepository: OrderRepository,
    ) {}

    async getOrdersWithFilters(dto: GetOrdersFilterDto): Promise<IGetManyPagination<OrderEntity>> {
        const [orders, total] = await this.orderRepository.findManyByFilters(dto);
        return { total, data: orders };
    }

    async handleOrders(dto: HandleOrderDto, orderId: number): Promise<IMessage> {
        const order = await this.orderRepository.getOne({
            where: { id: orderId },
        })

        if (!order) throw new NotFoundException('Order not found');

        await this.orderRepository.update(order.id, dto);
        return { message: 'Order updated successfully' };
    }

    async deleteOrder(id: number): Promise<IMessage> {
        const order = await this.orderRepository.getOne({
            where: { id },
        })

        if (!order) throw new NotFoundException("Order not found")

        await this.orderRepository.delete(order.id)
        return { message: "Order deleted successfully" }
    }
}