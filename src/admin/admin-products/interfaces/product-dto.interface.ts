export interface IProductDto {
    price: number;
    title: string;
    mainPhoto: string;
    description?: string;
    categoryIds: number[];
    images?: string[];
    color?: string;
}