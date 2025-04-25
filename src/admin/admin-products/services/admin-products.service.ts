import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ProductsRepository } from 'src/products/repositories/product.repository';
import { SubCategoryRepository } from 'src/categories/reposiroties/sub-category.repository';
import { ProductImagesRepository } from '../../../products/repositories/product-images.repository';
import { IProduct } from 'src/products/interfaces/product.interface';
import { IProductImages } from 'src/products/interfaces/product-images.interface';
import { In } from 'typeorm';
import { IMessage } from 'src/common/dto/responses/message.response';
import { UpdateProductDto } from '../dtos/update-product.dto';

@Injectable()
export class AdminProductsService {
    constructor(
        private readonly subCategoryRepository: SubCategoryRepository,
        private readonly productRepository: ProductsRepository,
        private readonly productImagesRepository: ProductImagesRepository
    ) {}

    async deleteProduct(id: number): Promise<IMessage> {
        const product = await this.productRepository.getOne({
            where: { id },
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        await this.productRepository.delete(product);

        return {
            message: 'Product deleted successfully',
        };
    }

    async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<IMessage> {
        const product = await this.productRepository.getOne({ where: { id } });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        const updatedProduct = Object.assign(product, updateProductDto);
        await this.productRepository.save(updatedProduct);
        return {
            message: 'Product updated successfully', 
        }
    }

    async createProduct(dto: CreateProductDto): Promise<IMessage> {
        const { 
            price, 
            title, 
            mainPhoto, 
            description, 
            subcategoryId,
            images, 
        } = dto;

        const subCategory = await this.subCategoryRepository.getOne({
            where: { id: subcategoryId }
        });

        if (!subCategory) {
            throw new NotFoundException('Subcategory not found');
        }

        const productImages = await this.handleImages(images)

        const ProductBuild = new IProduct();
        ProductBuild.price = price;
        ProductBuild.title = title;
        ProductBuild.mainPhoto = mainPhoto;
        ProductBuild.description = description;
        ProductBuild.subCategory = subCategory;
        ProductBuild.images = productImages;

        await this.productRepository.save(ProductBuild);

        return {
            message: 'Product created successfully',
        };
    }

    private async handleImages(images: string[]): Promise<IProductImages[]> {
        if (!images.length) {
            return [];
        }
        
        return await this.productImagesRepository.getMany({
            where: { imageName: In(images) },
        });
    }    
}
