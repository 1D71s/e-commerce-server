import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ISession } from '../interfaces/session.interface';
import { UserEntity } from 'src/web/users/entities/user.entity';

@Entity('sessions')
export class SessionEntity implements ISession {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true })
    token: string;

    @Column({ type: 'timestamp' })
    exp: Date;

    @ManyToOne(() => UserEntity, (user) => user.sessions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user' })
    user: UserEntity;

    @Column({ name: 'user_agent' })
    userAgent: string;
}
