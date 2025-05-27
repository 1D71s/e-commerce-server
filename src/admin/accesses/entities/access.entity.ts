import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Endpoints } from '../enums/endpoints.enum';
import { RoleEntity } from '../../roles/entities/role.entity';

@Entity('accesses')
export class AccessEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({ type: "enum", enum: Endpoints, nullable: false })
    endpoint: Endpoints;

    @ManyToMany(() => RoleEntity, (role) => role.accesses)
    roles: RoleEntity[];
}