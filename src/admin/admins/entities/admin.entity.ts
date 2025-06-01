import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { RoleEntity } from "src/admin/roles/entities/role.entity";
import { IAdmin } from '../interfaces/admin.interface';
import { ProductEntity } from '../../../web/products/entities/product.entity';

@Entity('admins')
export class AdminEntity implements IAdmin {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false })
    email: string;

    @ManyToOne(() => RoleEntity, (role) => role.admins, { nullable: true })
    @JoinColumn({ name: 'role_id' })
    role?: RoleEntity;

    @Column({ nullable: true })
    name?: string;

    @Column({ nullable: true, select: false })
    password: string;

    @OneToMany(() => ProductEntity, (product) => product.admin, { nullable: true })
    products: ProductEntity[];

    @CreateDateColumn()
    createdAt: Date;
}