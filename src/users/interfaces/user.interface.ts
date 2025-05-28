import { Provider } from "./enums/provider.enum";
import { SessionEntity } from "src/sessions/entities/session.entity";
import { RoleEntity } from '../../admin/roles/entities/role.entity';

export interface IUser {
    id: number;
    email: string;
    role?: RoleEntity
    name?: string;
    provider?: Provider;
    password: string;
    sessions: SessionEntity[];
}