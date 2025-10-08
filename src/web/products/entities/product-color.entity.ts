import { Column, Entity, ManyToOne } from 'typeorm';
import { BasicEntity } from '../../../database/entities/basic.entity';
import { ProductPropertyEntity } from './product-property.entity';
import { IProductColor } from '../interfaces/product-color.interface';

@Entity('products_color')
export class ProductColorEntity extends BasicEntity implements IProductColor {
    @Column()
    value: string;

    @ManyToOne(() => ProductPropertyEntity, (property) => property.colors, {
        onDelete: 'CASCADE',
    })
    productProperty: ProductPropertyEntity;
}
