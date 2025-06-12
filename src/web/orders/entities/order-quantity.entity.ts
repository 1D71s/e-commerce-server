import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from '../../products/entities/product.entity';
import { IOrderQuantity } from '../interfaces/order-quantity.interface';
import { BasicEntity } from '../../../database/entities/basic.entity';

@Entity('order_quantities')
export class OrderQuantityEntity extends BasicEntity implements IOrderQuantity{
    @ManyToOne(() => OrderEntity, order => order.quantities, { onDelete: 'CASCADE' })
    order: OrderEntity;

    @ManyToOne(() => ProductEntity, { eager: true })
    @JoinColumn({ name: 'productId' })
    product: ProductEntity;

    @Column()
    quantity: number;

    @Column()
    sizeProduct?: string;
}
