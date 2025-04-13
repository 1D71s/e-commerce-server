import { SubcategoryEntity } from "src/categories/entities/sub-category.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IProduct } from "../interfaces/product.interface";

@Entity('products')
export class ProductEntity implements IProduct {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'int', nullable: false })
    price: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'varchar' })
    mainPhoto: string;

    @Column({ nullable: false, default: "default" })
    primaryPhoto: string;

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => SubcategoryEntity, (subcategory) => subcategory.products)
    @JoinColumn({ name: 'subcategoryId' })
    subcategory: SubcategoryEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
