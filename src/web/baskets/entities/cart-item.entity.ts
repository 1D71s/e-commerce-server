import { ProductEntity } from 'src/web/products/entities/product.entity';
import { UserEntity } from 'src/web/users/entities/user.entity';
import {
  Entity,
  ManyToOne,
  Column,
} from 'typeorm';
import { ICartItem } from '../interfaces/cart-item.interface';
import { BasicEntity } from '../../../database/entities/basic.entity';

@Entity('cart_items')
export class CartItemEntity extends BasicEntity implements ICartItem {
    @ManyToOne(() => UserEntity, (user) => user.cartItems, { onDelete: 'CASCADE' })
    user: UserEntity;

    @ManyToOne(() => ProductEntity, (product) => product.cartItems, { onDelete: 'CASCADE' })
    product: ProductEntity;

    @Column({ type: 'int', default: 1 })
    quantity: number;
}
