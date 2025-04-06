import { Roles } from "src/admin/roles/enums/roles.enum";

export interface JwtPayloadUserInterface {
    id: number;
    email: string;
    session: string;
    role: Roles;
}