import { SubcategoryEntity } from "src/categories/entities/sub-category.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { IProduct } from "../interfaces/product.interface";
import { ProductImagesEntity } from "./product-images.entity";
import { CartItemEntity } from "src/baskets/entities/cart-item.entity";

@Entity('products')
export class ProductEntity implements IProduct {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'int', nullable: false })
    price: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ nullable: false, default: "default" })
    mainPhoto: string;

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => SubcategoryEntity, (subcategory) => subcategory.products)
    @JoinColumn({ name: 'subcategoryId' })
    subCategory: SubcategoryEntity;

    @OneToMany(() => ProductImagesEntity, (image) => image.product)
    images: ProductImagesEntity[];
    
    @OneToMany(() => CartItemEntity, (cartItem) => cartItem.product)
    cartItems: CartItemEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
