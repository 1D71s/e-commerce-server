export interface IResetToken {
    id: number;
    token: string;
    exp: Date;
    userId: number;
    userAgent: string;
    createdAt: Date;
}
