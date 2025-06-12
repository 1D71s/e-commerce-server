import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ISession } from '../interfaces/session.interface';
import { UserEntity } from 'src/web/users/entities/user.entity';
import { BasicEntity } from '../../../database/entities/basic.entity';

@Entity('sessions')
export class SessionEntity extends BasicEntity implements ISession {
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
