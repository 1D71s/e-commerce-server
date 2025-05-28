import { IUser } from 'src/web/users/interfaces/user.interface';
import { IAccess } from '../../accesses/interfaces/access.interface';

export interface IRole {
    id: number;
    name: string;
    users: IUser[];
    accesses: IAccess[]
}