import { Entity, Column, OneToMany } from 'typeorm';
import { Provider } from "../interfaces/enums/provider.enum";
import { IUser } from "../interfaces/user.interface";
import { ResetToken } from "./reset-token.entity";
import { SessionEntity } from 'src/web/sessions/entities/session.entity';
import { CartItemEntity } from 'src/web/baskets/entities/cart-item.entity';
import { OrderEntity } from '../../orders/entities/order.entity';
import { BasicEntity } from '../../../database/entities/basic.entity';

@Entity('users')
export class UserEntity  extends BasicEntity implements IUser {
    @Column({ nullable: false })
    email: string;

    @Column({ nullable: true })
    name?: string;

    @Column({ nullable: true })
    provider?: Provider;

    @Column({ nullable: true, select: false })
    password: string;

    @OneToMany(() => SessionEntity, (session) => session.user)
    sessions: SessionEntity[];

    @OneToMany(() => SessionEntity, (reset_token) => reset_token.user)
    resetTokens: ResetToken[];

    @OneToMany(() => CartItemEntity, (cartItem) => cartItem.user)
    cartItems: CartItemEntity[];

    @OneToMany(() => OrderEntity, order => order.user)
    orders: OrderEntity[];
}