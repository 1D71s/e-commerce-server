import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { IResetToken } from '../interfaces/reset-token.interface';

@Entity('reset_token')  
export class ResetToken implements IResetToken {
  
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true })
    token: string;

    @Column({ type: 'timestamptz' })
    exp: Date;

    @Column()
    userId: number;

    @Column({ name: 'user_agent' })
    userAgent: string;

    @CreateDateColumn()
    createdAt: Date;
}
