import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ProductEntity } from "./product.entity";

@Entity('product_properties')
export class ProductPropertyEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: true })
    color: string;

    @ManyToOne(() => ProductEntity, (product) => product.properties, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'productId' })
    product: ProductEntity;
}
