import { ISession } from "src/web/sessions/interfaces/session.interface";

export interface IAccessToken {
    accessToken: string;
}

export interface ISessionAndAccessToken extends IAccessToken {
    session: ISession;
}