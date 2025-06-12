import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import { PaymentMethod } from '../enums/payment-method.enum';
import { OrderStatus } from '../enums/order-status.enum';
import { UserEntity } from '../../users/entities/user.entity';
import { OrderQuantityEntity } from './order-quantity.entity';
import { IOrder } from '../interfaces/order.interface';
import { OrderAddressEntity } from './order-address.entity';
import { BasicEntity } from '../../../database/entities/basic.entity';

@Entity('orders')
export class OrderEntity extends BasicEntity implements IOrder{
    @Column({ length: 100 })
    firstName: string;

    @Column({ length: 100 })
    lastName: string;

    @Column({ length: 150 })
    email: string;

    @Column({ length: 20 })
    phone: string;

    @Column({ type: 'text', nullable: true })
    message?: string;

    @Column({ type: 'enum', enum: PaymentMethod, nullable: true })
    paymentMethod?: PaymentMethod;

    @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.Pending })
    status: OrderStatus;

    @ManyToOne(() => UserEntity, user => user.orders, { nullable: true, eager: true })
    @JoinColumn({ name: 'userId' })
    user?: UserEntity;

    @OneToMany(() => OrderQuantityEntity, orderQuantity => orderQuantity.order, {
        cascade: true,
        eager: true,
    })
    quantities: OrderQuantityEntity[];

    @OneToOne(() => OrderAddressEntity, address => address.order, {
        cascade: true,
        eager: true,
    })
    @JoinColumn()
    address: OrderAddressEntity;
}