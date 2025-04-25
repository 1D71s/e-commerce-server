export interface IProductDto {
    price: number;
    title: string;
    mainPhoto: string;
    description?: string;
    subcategoryId: number;
    images?: string[];
}