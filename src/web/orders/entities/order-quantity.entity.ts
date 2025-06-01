import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from '../../products/entities/product.entity';
import { IOrderQuantity } from '../interfaces/order-quantity.interface';

@Entity('order_quantities')
export class OrderQuantityEntity implements IOrderQuantity{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => OrderEntity, order => order.quantities, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'orderId' })
    order: OrderEntity;

    @ManyToOne(() => ProductEntity, { eager: true })
    @JoinColumn({ name: 'productId' })
    product: ProductEntity;

    @Column()
    quantity: number;
}
