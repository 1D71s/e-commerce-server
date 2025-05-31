import { RoleEntity } from "src/admin/roles/entities/role.entity";
import { Provider } from "./enums/provider.enum";
import { SessionEntity } from "src/web/sessions/entities/session.entity";
import { IProduct } from '../../products/interfaces/product.interface';

export interface IUser {
    id: number;
    email: string;
    role?: RoleEntity
    name?: string;
    provider?: Provider;
    password: string;
    sessions: SessionEntity[];
    products: IProduct[]
}