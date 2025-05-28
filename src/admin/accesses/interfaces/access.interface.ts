import { Endpoint } from '../enums/endpoint.enum';
import { AccessCategory } from '../enums/access-category.enum';

export interface IAccess {
    title: string;
    category: AccessCategory;
    endpoint: Endpoint;
}