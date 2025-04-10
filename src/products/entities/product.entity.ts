import { CategoryEntity } from "src/categories/entities/category.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity('products')
export class ProductEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ length: 255, nullable: false, default: "default" })
    primaryPhoto: string;

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    @JoinColumn({ name: 'categoryId' })
    category: CategoryEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}