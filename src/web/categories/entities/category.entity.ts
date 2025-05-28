import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { SubcategoryEntity } from '../../sub-categories/entities/sub-category.entity';
import { ICategory } from '../interfaces/category.interface';

@Entity('categories')
export class CategoryEntity implements ICategory {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;

    @OneToMany(() => SubcategoryEntity, (subcategory) => subcategory.category)
    subcategories: SubcategoryEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
