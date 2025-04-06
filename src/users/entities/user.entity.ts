import { TokenEntity } from "src/sessions/entities/token.entity";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, OneToMany } from "typeorm";
import { Provider } from "./enums/provider.enum";
import { Roles } from "src/admin/roles/enums/roles.enum";

@Entity('users')
export class UserEntity {
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

    @Column({ nullable: true })
    password: string;

    @OneToMany(() => TokenEntity, (token) => token.user)
    tokens: TokenEntity[];
    
    @CreateDateColumn()
    createdAt: Date;
}
