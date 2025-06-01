import { Provider } from "./enums/provider.enum";
import { SessionEntity } from "src/web/sessions/entities/session.entity";

export interface IUser {
    id: number;
    email: string;
    name?: string;
    provider?: Provider;
    password: string;
    sessions: SessionEntity[];
}