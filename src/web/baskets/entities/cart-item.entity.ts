import { ProductEntity } from 'src/web/products/entities/product.entity';
import { UserEntity } from 'src/web/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('cart_items')
export class CartItemEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserEntity, (user) => user.cartItems, { onDelete: 'CASCADE' })
    user: UserEntity;

    @ManyToOne(() => ProductEntity, (product) => product.cartItems, { onDelete: 'CASCADE' })
    product: ProductEntity;

    @Column({ type: 'int', default: 1 })
    quantity: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
