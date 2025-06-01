import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateOrderDto } from '../dtos/requests/create-order.dto';
import { IMessage } from '../../../common/dto/responses/message.response';
import { OrderRepository } from '../repositories/order.reposotory';
import { OrderQuantityRepository } from '../repositories/order-quantity.repository';
import { OrderAddressRepository } from '../repositories/order-address.repository';
import { OrderStatus } from '../enums/order-status.enum';
import { UserRepository } from '../../users/repositories/user.repository';
import { ProductsRepository } from '../../products/repositories/product.repository';

@Injectable()
export class OrdersService {
    constructor(
      private readonly ordersRepository: OrderRepository,
      private readonly orderQuantityRepository: OrderQuantityRepository,
      private readonly orderAddressRepository: OrderAddressRepository,
      private readonly usersRepository: UserRepository,
      private readonly productsRepository: ProductsRepository,
      private readonly dataSource: DataSource,
    ) {}

    async createOrder(dto: CreateOrderDto, userId: number): Promise<IMessage> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const user = await this.usersRepository.findById(userId);
            if (!user) {
                throw new NotFoundException('User not found');
            }

            const savedAddress = await queryRunner.manager.save(
              this.orderAddressRepository.create({
                  deliveryProvider: dto.address.deliveryProvider,
                  address: dto.address.address,
                  city: dto.address.city,
                  zipCode: dto.address.zipCode,
                  message: dto.address.message,
              })
            );

            const order = this.ordersRepository.create({
                firstName: dto.firstName,
                lastName: dto.lastName,
                email: dto.email,
                phone: dto.phone,
                message: dto.message,
                paymentMethod: dto.paymentMethod,
                status: OrderStatus.Pending,
                user,
                address: savedAddress,
            });

            const savedOrder = await queryRunner.manager.save(order);

            const quantitiesPromises = dto.quantities.map(async (item) => {
                const product = await this.productsRepository.getOne({ where: { id: item.productId } });

                if (!product) {
                    throw new NotFoundException(`Product with ID ${item.productId} not found`);
                }

                const orderQuantity = this.orderQuantityRepository.create({
                    quantity: item.quantity,
                    product,
                    order: savedOrder,
                });

                return queryRunner.manager.save(orderQuantity);
            });

            await Promise.all(quantitiesPromises);

            await queryRunner.commitTransaction();

            return { message: 'Order created successfully!' };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}
