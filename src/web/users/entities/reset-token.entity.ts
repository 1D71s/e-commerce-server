import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, ManyToOne } from 'typeorm';
import { IResetToken } from '../interfaces/reset-token.interface';
import { UserEntity } from './user.entity';

@Entity('reset_token')  
export class ResetToken implements IResetToken {
  
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true })
    token: string;

    @Column({ type: 'timestamptz' })
    exp: Date;

    @ManyToOne(() => UserEntity, (user) => user.resetTokens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user' })
    user: UserEntity;

    @CreateDateColumn()
    createdAt: Date;
}
