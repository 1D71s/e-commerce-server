import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('reset_token')  
export class ResetToken {
  
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
