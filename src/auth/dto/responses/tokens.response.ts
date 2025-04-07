import { ISession } from "src/sessions/interfaces/session.interface";

export interface IAccessToken {
    accessToken: string;
}

export interface ITokens extends IAccessToken  {
    refreshToken: string;
}

export interface ISessionAndAccessToken extends IAccessToken {
    session: ISession;
}