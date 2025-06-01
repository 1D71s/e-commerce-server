import { RoleEntity } from "src/admin/roles/entities/role.entity";
import { IProduct } from '../../../web/products/interfaces/product.interface';

export interface IAdmin {
    id: number;
    email: string;
    role?: RoleEntity
    name?: string;
    password: string;
    products: IProduct[]
}