import { Endpoint } from '../enums/endpoint.enum';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from '../../roles/entities/role.entity';
import { AccessCategory } from '../enums/access-category.enum';
import { IAccess } from '../interfaces/access.interface';

@Entity('accesses')
export class AccessEntity implements IAccess {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({ type: "enum", enum: AccessCategory, nullable: false })
    category: AccessCategory;

    @Column({ type: "enum", enum: Endpoint, nullable: false })
    endpoint: Endpoint;

    @ManyToMany(() => RoleEntity, (role) => role.accesses)
    roles: RoleEntity[];
}