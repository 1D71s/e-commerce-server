import { Roles } from "src/admin/roles/enums/roles.enum";
import { Provider } from "./enums/provider.enum";
import { SessionEntity } from "src/sessions/entities/session.entity";

export interface IUser {
    id: number;
    email: string;
    role: Roles
    name?: string;
    provider?: Provider;
    password: string;
    sessions: SessionEntity[];
}