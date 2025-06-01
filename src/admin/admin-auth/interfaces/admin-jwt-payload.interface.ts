import { IRole } from '../../roles/interfaces/role.interface';

export interface IAdminJwtPayload {
    id: number;
    email: string;
    role: IRole;
}