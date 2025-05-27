import { Endpoint } from '../enums/endpoint.enum';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from '../../roles/entities/role.entity';

@Entity('accesses')
export class AccessEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false })
    title: string;

    @Column({ type: "enum", enum: Endpoint, nullable: false })
    endpoint: Endpoint;

    @ManyToMany(() => RoleEntity, (role) => role.accesses)
    roles: RoleEntity[];
}