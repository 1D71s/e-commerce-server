import { TokenEntity } from "src/sessions/entities/token.entity";

export interface AccessToken {
    accessToken: string;
}

export interface Tokens extends AccessToken {
    refreshToken: TokenEntity;
}