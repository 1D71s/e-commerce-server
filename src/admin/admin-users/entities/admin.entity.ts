import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { RoleEntity } from "src/admin/roles/entities/role.entity";
import { IAdminUser } from '../interfaces/admin-user.interface';
import { ProductEntity } from '../../../web/products/entities/product.entity';

@Entity('admin_users')
export class AdminUserEntity implements IAdminUser {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false })
    email: string;

    @ManyToOne(() => RoleEntity, (role) => role.admins, { nullable: false })
    @JoinColumn({ name: 'role_id' })
    role: RoleEntity;

    @Column({ nullable: true })
    name?: string;

    @Column({ nullable: true, select: false })
    password: string;

    @OneToMany(() => ProductEntity, (product) => product.admin, { nullable: true })
    products: ProductEntity[];

    @CreateDateColumn()
    createdAt: Date;
}