import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { ISubCategory } from '../interfaces/sub-category.interface';

@Entity('subcategories')
export class SubcategoryEntity implements ISubCategory {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;

    @ManyToOne(() => CategoryEntity, (category) => category.subcategories)
    @JoinColumn({ name: 'categoryId' })
    category: CategoryEntity;

    @OneToMany(() => ProductEntity, (product) => product.subcategory)
    products: ProductEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
