import {
    Entity,
    Column, OneToOne, JoinColumn,
} from 'typeorm';
import { DeliveryProvider } from '../enums/delivery-provider.enum';
import { IOrderAddress } from '../interfaces/order-address.interface';
import { OrderEntity } from './order.entity';
import { BasicEntity } from '../../../database/entities/basic.entity';

@Entity('order_addresses')
export class OrderAddressEntity extends BasicEntity implements IOrderAddress{
    @Column({ type: 'enum', enum: DeliveryProvider })
    deliveryProvider: DeliveryProvider;

    @Column({ length: 255 })
    address: string;

    @Column({ length: 100 })
    city: string;

    @Column({ length: 20, nullable: true })
    zipCode?: string;

    @Column({ type: 'text', nullable: true })
    message?: string;

    @OneToOne(() => OrderEntity, order => order.address, { onDelete: 'CASCADE' })
    @JoinColumn()
    order: OrderEntity;
}
