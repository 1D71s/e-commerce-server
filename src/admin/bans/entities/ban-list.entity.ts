import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class BanList {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    userId: number;

    @Column()
    reason: string;

    @Column({ type: 'timestamp', nullable: true })
    activeUntil: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}