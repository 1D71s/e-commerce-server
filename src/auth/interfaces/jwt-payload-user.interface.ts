import { Roles } from "src/admin/roles/enums/roles.enum";

export interface IJwtPayload {
    id: number;
    email: string;
    sessionToken: string;
    role: Roles;
}