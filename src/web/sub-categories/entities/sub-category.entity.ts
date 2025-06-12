import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ISubCategory } from '../interfaces/sub-category.interface';
import { ProductEntity } from 'src/web/products/entities/product.entity';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { BasicEntity } from '../../../database/entities/basic.entity';

@Entity('subcategories')
export class SubcategoryEntity extends BasicEntity implements ISubCategory {
    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;

    @ManyToOne(() => CategoryEntity, (category) => category.subcategories)
    @JoinColumn({ name: 'categoryId' })
    category: CategoryEntity;

    @OneToMany(() => ProductEntity, (product) => product.subCategory)
    products: ProductEntity[];
}
