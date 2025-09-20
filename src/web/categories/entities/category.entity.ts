import { Entity, Column, OneToMany, ManyToMany, ManyToOne, JoinColumn } from 'typeorm';
import { ICategory } from '../interfaces/category.interface';
import { BasicEntity } from '../../../database/entities/basic.entity';
import { ProductEntity } from 'src/web/products/entities/product.entity';

@Entity('categories')
export class CategoryEntity extends BasicEntity implements ICategory {
    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;

    @ManyToMany(() => ProductEntity, (product) => product.category)
    products: ProductEntity[];

    @ManyToOne(() => CategoryEntity, { nullable: true })
    @JoinColumn({ name: 'parentId' })
    parent?: CategoryEntity;
}
