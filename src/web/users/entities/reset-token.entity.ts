import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { IResetToken } from '../interfaces/reset-token.interface';
import { UserEntity } from './user.entity';
import { BasicEntity } from '../../../database/entities/basic.entity';

@Entity('reset_token')  
export class ResetToken extends BasicEntity implements IResetToken {
    @Column({ unique: true })
    token: string;

    @Column({ type: 'timestamptz' })
    exp: Date;

    @ManyToOne(() => UserEntity, (user) => user.resetTokens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user' })
    user: UserEntity;
}
