import { Entity, Column, OneToMany } from 'typeorm';
import { SubcategoryEntity } from '../../sub-categories/entities/sub-category.entity';
import { ICategory } from '../interfaces/category.interface';
import { BasicEntity } from '../../../database/entities/basic.entity';

@Entity('categories')
export class CategoryEntity extends BasicEntity implements ICategory {
    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;

    @OneToMany(() => SubcategoryEntity, (subcategory) => subcategory.category)
    subcategories: SubcategoryEntity[];
}
