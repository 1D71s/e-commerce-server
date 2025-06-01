import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { IProduct } from "../interfaces/product.interface";
import { ProductImagesEntity } from "./product-images.entity";
import { CartItemEntity } from "src/web/baskets/entities/cart-item.entity";
import { SubcategoryEntity } from "src/web/sub-categories/entities/sub-category.entity";
import { AdminUserEntity } from '../../../admin/admin-users/entities/admin.entity';

@Entity('products')
export class ProductEntity implements IProduct {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'int', nullable: false })
    price: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @ManyToOne(() => AdminUserEntity, (adminUser) => adminUser.products, { nullable: false })
    @JoinColumn({ name: 'userId' })
    admin: AdminUserEntity;

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
