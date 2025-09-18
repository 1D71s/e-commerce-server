import { Entity, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { ProductEntity } from "./product.entity";
import { BasicEntity } from '../../../database/entities/basic.entity';
import { IProductProperties } from '../interfaces/product-properties.interface';
import { ProductSizeEntity } from './product-size.entity';
import { IProduct } from '../interfaces/product.interface';

@Entity('product_properties')
export class ProductPropertyEntity extends BasicEntity implements IProductProperties {
    @Column({ type: 'varchar', length: 100, nullable: true })
    color: string;

    @ManyToMany(() => ProductSizeEntity, (size) => size.productProperties)
    @JoinTable({
        name: "products_property_sizes",
        joinColumn: { name: "productId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "sizeId", referencedColumnName: "id" }
    })
    sizes: ProductSizeEntity[];

    @ManyToOne(() => ProductEntity, (product) => product.properties, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'productId' })
    product: IProduct;
}
