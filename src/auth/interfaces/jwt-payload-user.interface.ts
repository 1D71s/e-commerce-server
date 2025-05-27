import { IRole } from '../../admin/roles/interfaces/role.interface';

export interface IJwtPayload {
    id: number;
    email: string;
    refreshToken: string;
    role: IRole;
}