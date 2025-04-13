import { USER_SESSIONS } from "../variables";

export function buildRedisKey(userId: number, userAgent: string): string {
    return `${USER_SESSIONS}_${userAgent}:${userId}`;

}