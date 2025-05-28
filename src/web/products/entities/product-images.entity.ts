import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { IProductImages } from "../interfaces/product-images.interface";
import { ProductEntity } from "./product.entity";

@Entity("product_images")
export class ProductImagesEntity implements IProductImages {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column({ type: "varchar", length: 255 })
    imageName: string;

    @ManyToOne(() => ProductEntity, (product) => product.images)
    product: ProductEntity;
}