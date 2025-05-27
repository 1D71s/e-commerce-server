import { IUser } from '../../../users/interfaces/user.interface';
import { AccessInterface } from '../../accesses/interfaces/access.interface';

export interface IRole {
    id: number;
    name: string;
    users: IUser[];
    accesses: AccessInterface[]
}