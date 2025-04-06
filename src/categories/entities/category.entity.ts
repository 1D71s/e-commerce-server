import { ProductEntity } from 'src/products/entities/product.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn
} from 'typeorm';

@Entity('categories')
export class CategoryEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @OneToMany(() => CategoryEntity, (category) => category.parentCategory)
    children: CategoryEntity[];

    @ManyToOne(() => CategoryEntity, (category) => category.children, { nullable: true })
    @JoinColumn({ name: 'parentId' })
    parentCategory: CategoryEntity;

    @OneToMany(() => ProductEntity, (product) => product.category)
    products: ProductEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}