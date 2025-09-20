import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
    JoinTable,
    ManyToMany,
} from 'typeorm';
import { IProduct } from "../interfaces/product.interface";
import { ProductImagesEntity } from "./product-images.entity";
import { CartItemEntity } from "src/web/baskets/entities/cart-item.entity";
import { AdminUserEntity } from '../../../admin/admin-users/entities/admin.entity';
import { ProductPropertyEntity } from './product-property.entity';
import { BasicEntity } from '../../../database/entities/basic.entity';
import { CategoryEntity } from 'src/web/categories/entities/category.entity';

@Entity('products')
export class ProductEntity extends BasicEntity implements IProduct {
    
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

    @OneToMany(() => ProductImagesEntity, (image) => image.product)
    images: ProductImagesEntity[];
    
    @OneToMany(() => CartItemEntity, (cartItem) => cartItem.product)
    cartItems: CartItemEntity[];

    @OneToMany(() => ProductPropertyEntity, (property) => property.product)
    properties: ProductPropertyEntity;

    @ManyToMany(() => CategoryEntity, { cascade: true })
    @JoinTable({
        name: "product_categories",
        joinColumn: { name: "productId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "categoryId", referencedColumnName: "id" }
    })
    category: CategoryEntity[];
}