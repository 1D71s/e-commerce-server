import { SessionEntity } from "src/sessions/entities/session.entity";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToMany } from "typeorm";
import { Provider } from "../interfaces/enums/provider.enum";
import { Roles } from "src/admin/roles/enums/roles.enum";
import { IUser } from "../interfaces/user.interface";

@Entity('users')
export class UserEntity implements IUser {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false, default: Roles.CUSTOMER })
    role: Roles

    @Column({ nullable: true })
    name?: string;

    @Column({ nullable: true })
    provider?: Provider;

    @Column({ nullable: true, select: false })
    password: string;

    @OneToMany(() => SessionEntity, (session) => session.user)
    sessions: SessionEntity[];
    
    @CreateDateColumn()
    createdAt: Date;
}