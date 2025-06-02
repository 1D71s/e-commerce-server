import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateOrderDto } from '../dtos/requests/create-order.dto';
import { IMessage } from '../../../common/dto/responses/message.response';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderQuantityEntity } from '../entities/order-quantity.entity';
import { ProductEntity } from '../../products/entities/product.entity';
import { OrderEntity } from '../entities/order.entity';
import { OrderAddressEntity } from '../entities/order-address.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { OrderRepository } from '../repositories/order.reposotory';
import { IGetManyPagination } from '../dtos/responses/get-many-pagination.response';

@Injectable()
export class OrdersService {
    constructor(
      private readonly dataSource: DataSource,
      private readonly orderRepository: OrderRepository,
    ) {}

    async getAllUserOrders(userId: number): Promise<IGetManyPagination<OrderEntity>> {
        const [orders, total] = await this.orderRepository.findManyWithOptions({
            where: { user: { id: userId } },
            relations: ['address', 'quantities'],
            skip: 0,
            take: 10,
            order: { createdAt: 'DESC' },
        });

        return { total, data: orders }
    }

    async createOrder(dto: CreateOrderDto, userId: number): Promise<IMessage> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const user = await queryRunner.manager.findOne(UserEntity, { where: { id: userId } });
            if (!user) {
                throw new NotFoundException('User not found');
            }

            const order = queryRunner.manager.create(OrderEntity, {
                firstName: dto.firstName,
                lastName: dto.lastName,
                email: dto.email,
                phone: dto.phone,
                message: dto.message,
                paymentMethod: dto.paymentMethod,
                status: OrderStatus.Pending,
                user,
            });

            const savedOrder = await queryRunner.manager.save(order);

            const address = queryRunner.manager.create(OrderAddressEntity, {
                deliveryProvider: dto.address.deliveryProvider,
                address: dto.address.address,
                city: dto.address.city,
                zipCode: dto.address.zipCode,
                message: dto.address.message,
                order: savedOrder,
            });

            const savedAddress = await queryRunner.manager.save(address);

            savedOrder.address = savedAddress;
            await queryRunner.manager.save(savedOrder);

            for (const item of dto.quantities) {
                const product = await queryRunner.manager.findOne(ProductEntity, {
                    where: { id: item.productId },
                });

                if (!product) {
                    throw new NotFoundException(`Product with ID ${item.productId} not found`);
                }

                const orderQuantity = queryRunner.manager.create(OrderQuantityEntity, {
                    quantity: item.quantity,
                    product,
                    order: savedOrder,
                });

                await queryRunner.manager.save(orderQuantity);
            }

            await queryRunner.commitTransaction();

            return { message: 'Order created successfully!' };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async deleteOrder(id: number, userId: number): Promise<IMessage> {
        const order = await this.orderRepository.getOne({
            where: { id, user: { id: userId } },
        })

        if (!order) throw new NotFoundException("Order not found")

        await this.orderRepository.delete(order.id)
        return { message: "Order deleted successfully" }
    }
}
