import { Column, Entity, ManyToOne } from "typeorm";
import { IProductImages } from "../interfaces/product-images.interface";
import { ProductEntity } from "./product.entity";
import { BasicEntity } from '../../../database/entities/basic.entity';

@Entity("product_images")
export class ProductImagesEntity extends BasicEntity implements IProductImages {
    @Column({ type: "varchar", length: 255 })
    imageName: string;

    @ManyToOne(() => ProductEntity, (product) => product.images)
    product: ProductEntity;
}