import { IAccess } from '../../accesses/interfaces/access.interface';
import { IAdmin } from '../../admins/interfaces/admin.interface';

export interface IRole {
    id: number;
    name: string;
    admins: IAdmin[];
    accesses: IAccess[]
}