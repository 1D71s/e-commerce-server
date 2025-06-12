import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { BasicEntity } from '../../../database/entities/basic.entity';
import { IProductProperties } from '../interfaces/product-properties.interface';

@Entity('product_properties')
export class ProductPropertyEntity extends BasicEntity implements IProductProperties{
    @Column({ type: 'varchar', length: 100, nullable: true })
    color: string;

    @ManyToOne(() => ProductEntity, (product) => product.properties, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'productId' })
    product: ProductEntity;
}
