import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { IRole } from "../interfaces/role.interface";
import { AccessEntity } from '../../accesses/entities/access.entity';
import { AdminUserEntity } from '../../admin-users/entities/admin.entity';

@Entity('roles')
export class RoleEntity implements IRole {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false, unique: true })
    name: string;

    @OneToMany(() => AdminUserEntity, (adminUser) => adminUser.role)
    admins: AdminUserEntity[];

    @ManyToMany(() => AccessEntity, (access) => access.roles)
    @JoinTable({
        name: 'role_accesses',
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'access_id', referencedColumnName: 'id' }
    })
    accesses: AccessEntity[];
}
