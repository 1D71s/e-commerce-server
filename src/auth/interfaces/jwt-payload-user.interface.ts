import { Roles } from "src/admin/roles/enums/roles.enum";

export interface IJwtPayload {
    id: number;
    email: string;
    refreshToken: string;
    role: Roles;
}