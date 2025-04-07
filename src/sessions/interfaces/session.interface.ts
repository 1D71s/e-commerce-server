import { IUser } from "src/users/interfaces/user.interface";

export interface ISession {
    id: number;
    token: string;
    exp: Date;
    user: IUser;
    userAgent: string;
}