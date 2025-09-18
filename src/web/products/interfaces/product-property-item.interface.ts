import { IProductProperties } from './product-properties.interface';

export interface IProductPropertyItem {
    id: number;
    key: string;
    value: string;
    productsProperty: IProductProperties;
}