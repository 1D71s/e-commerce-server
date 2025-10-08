import { Entity, ManyToMany, JoinTable, OneToOne, OneToMany } from 'typeorm';
import { ProductEntity } from "./product.entity";
import { BasicEntity } from '../../../database/entities/basic.entity';
import { IProductProperties } from '../interfaces/product-properties.interface';
import { ProductSizeEntity } from './product-size.entity';
import { ProductColorEntity } from './product-color.entity';
import { ProductPropertyItemEntity } from './product-property-item.entity';

@Entity('product_properties')
export class ProductPropertyEntity extends BasicEntity implements IProductProperties {

    @OneToMany(() => ProductColorEntity, (color) => color.productProperty, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    colors: ProductColorEntity[];

    @ManyToMany(() => ProductSizeEntity, (size) => size.productProperties)
    @JoinTable({
        name: "products_property_sizes",
        joinColumn: { name: "productId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "sizeId", referencedColumnName: "id" }
    })
    sizes: ProductSizeEntity[];

    @OneToMany(() => ProductPropertyItemEntity, (propertyItem) => propertyItem.productsProperty, {
        cascade: true,
        onDelete: 'CASCADE',
    })
    propertyItems: ProductPropertyItemEntity[]

    @OneToOne(() => ProductEntity, (product) => product.properties, { onDelete: 'CASCADE' })
    product: ProductEntity;
}
