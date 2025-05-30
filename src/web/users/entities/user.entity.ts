import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Provider } from "../interfaces/enums/provider.enum";
import { IUser } from "../interfaces/user.interface";
import { ResetToken } from "./reset-token.entity";
import { RoleEntity } from "src/admin/roles/entities/role.entity";
import { SessionEntity } from 'src/web/sessions/entities/session.entity';
import { CartItemEntity } from 'src/web/baskets/entities/cart-item.entity';
import { ProductEntity } from '../../products/entities/product.entity';

@Entity('users')
export class UserEntity implements IUser {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false })
    email: string;

    @ManyToOne(() => RoleEntity, (role) => role.users, { nullable: true })
    @JoinColumn({ name: 'role_id' })
    role?: RoleEntity;

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

    @OneToMany(() => ProductEntity, (product) => product.user)
    products: ProductEntity[];

    @CreateDateColumn()
    createdAt: Date;
}