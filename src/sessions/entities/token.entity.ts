import { UserEntity } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('tokens')
export class TokenEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true })
    token: string;

    @Column({ type: 'timestamp' })
    exp: Date;

    @ManyToOne(() => UserEntity, (user) => user.tokens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: UserEntity;

    @Column()
    userId: number;

    @Column({ name: 'user_agent' })
    userAgent: string;
}
