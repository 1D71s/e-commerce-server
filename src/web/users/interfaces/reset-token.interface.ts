import { IUser } from "./user.interface";

export interface IResetToken {
    id: number;
    token: string;
    exp: Date;
    user: IUser;
    createdAt: Date;
}
