import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';
import { BasicEntity } from '../../../database/entities/basic.entity';
import { IProductProperties } from '../interfaces/product-properties.interface';
import { IProductPropertyItem } from '../interfaces/product-property-item.interface';
import { ProductPropertyEntity } from './product-property.entity';

@Entity("products_property_items")
export class ProductPropertyItemEntity extends BasicEntity implements IProductPropertyItem {
    @Column()
    key: string

    @Column()
    value: string;

    @ManyToOne(() => ProductPropertyEntity, (product) => product.sizes)
    productsProperty: IProductProperties;
}