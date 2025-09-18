import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IProductSize } from '../interfaces/product-size.interface';
import { ProductEntity } from './product.entity';
import { BasicEntity } from '../../../database/entities/basic.entity';
import { ProductPropertyEntity } from './product-property.entity';

@Entity("products_size")
export class ProductSizeEntity extends BasicEntity implements IProductSize {
    @Column()
    value: string;

    @ManyToMany(() => ProductPropertyEntity, (product) => product.sizes)
    productProperties: ProductPropertyEntity[];
}