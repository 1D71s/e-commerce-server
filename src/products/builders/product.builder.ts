import { ProductEntity } from '../entities/product.entity';
import { SubcategoryEntity } from 'src/categories/entities/sub-category.entity';
import { ProductImagesEntity } from '../entities/product-images.entity';

export class ProductBuilder {
    private readonly product: ProductEntity;

    constructor() {
        this.product = new ProductEntity();
    }

    setId(id: number): this {
        this.validatePositiveNumber(id, 'id');
        this.product.id = id;
        return this;
    }

    setName(name: string): this {
        this.validateNonEmptyString(name, 'name');
        this.product.name = name.trim();
        return this;
    }

    setPrice(price: number): this {
        this.validatePositiveNumber(price, 'price');
        this.product.price = price;
        return this;
    }

    setTitle(title: string): this {
        this.validateNonEmptyString(title, 'title');
        this.product.title = title.trim();
        return this;
    }

    setMainPhoto(mainPhoto: string): this {
        this.validateNonEmptyString(mainPhoto, 'mainPhoto');
        this.product.mainPhoto = mainPhoto.trim();
        return this;
    }

    setDescription(description: string): this {
        if (description) {
            this.validateNonEmptyString(description, 'description');
            this.product.description = description.trim();
        }
        return this;
    }

    setSubcategory(subcategory: SubcategoryEntity): this {
        if (!subcategory || typeof subcategory.id !== 'number') {
            throw new Error('Invalid subcategory provided.');
        }
        this.product.subcategory = subcategory;
        return this;
    }

    setImages(images: ProductImagesEntity[]): this {
        if (!Array.isArray(images) || images.some((img) => !img.id)) {
            throw new Error('Invalid product images provided.');
        }
        this.product.images = images;
        return this;
    }

    build(): ProductEntity {
        this.ensureProductIsValid();
        this.setTimestamps();
        return this.product;
    }

    private validatePositiveNumber(value: number, field: string): void {
        if (typeof value !== 'number' || value <= 0) {
            throw new Error(`The field "${field}" must be a positive number.`);
        }
    }

    private validateNonEmptyString(value: string, field: string): void {
        if (typeof value !== 'string' || value.trim() === '') {
            throw new Error(`The field "${field}" must be a non-empty string.`);
        }
    }

    private ensureProductIsValid(): void {
        const requiredFields = ['name', 'price', 'title', 'mainPhoto'];
        for (const field of requiredFields) {
            if (!this.product[field]) {
                throw new Error(`The field "${field}" is required but not set.`);
            }
        }
    }

    private setTimestamps(): void {
        const now = new Date();
        if (!this.product.createdAt) {
            this.product.createdAt = now;
        }
        this.product.updatedAt = now;
    }
}
