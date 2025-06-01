import { IAccess } from '../../accesses/interfaces/access.interface';
import { IAdminUser } from '../../admin-users/interfaces/admin-user.interface';

export interface IRole {
    id: number;
    name: string;
    admins: IAdminUser[];
    accesses: IAccess[]
}