import { SessionEntity } from "src/sessions/entities/session.entity";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Provider } from "../interfaces/enums/provider.enum";
import { IUser } from "../interfaces/user.interface";
import { ResetToken } from "./reset-token.entity";
import { CartItemEntity } from "src/baskets/entities/cart-item.entity";
import { RoleEntity } from '../../admin/roles/entities/role.entity';

@Entity('users')
export class UserEntity implements IUser {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false })
    email: string;

    @ManyToOne(() => RoleEntity, (role) => role.users, { nullable: true })
    @JoinColumn({ name: 'role_id' })
    role: RoleEntity;

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
    
    @CreateDateColumn()
    createdAt: Date;
}