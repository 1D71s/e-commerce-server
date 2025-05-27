import { Endpoints } from '../enums/endpoints.enum';

export interface AccessInterface {
    id: number;
    title: string;
    endpoint: Endpoints;
}