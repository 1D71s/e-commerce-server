import { Injectable, NotFoundException } from '@nestjs/common';
import { In } from 'typeorm';
import { IMessage } from 'src/common/dto/responses/message.response';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { CreateProductDto } from '../dtos/create-product.dto';
import { SubCategoryRepository } from 'src/web/sub-categories/repositories/sub-category.repository';
import { IProductImages } from 'src/web/products/interfaces/product-images.interface';
import { IProduct } from 'src/web/products/interfaces/product.interface';
import { ProductImagesRepository } from 'src/web/products/repositories/product-images.repository';
import { ProductsRepository } from 'src/web/products/repositories/product.repository';
import { ProductSizeRepository } from '../../../web/products/repositories/product-size.repository';
import { FilesService } from '../../../files/services/files.service';
import { AdminUserRepository } from '../../admin-users/repositories/admin-user.repository';

@Injectable()
export class AdminProductsService {
    constructor(
        private readonly subCategoryRepository: SubCategoryRepository,
        private readonly productRepository: ProductsRepository,
        private readonly productImagesRepository: ProductImagesRepository,
        private readonly adminUserRepository: AdminUserRepository,
        private readonly productSizeRepository: ProductSizeRepository,
        private readonly filesService: FilesService,
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

    async createProduct(dto: CreateProductDto, adminId: number): Promise<IMessage> {
        const { 
            price, 
            title, 
            mainPhoto, 
            description, 
            subcategoryId,
            images, 
        } = dto;

        const creator = await this.adminUserRepository.getOne({
            where: { id: adminId },
        })

        if (!creator) {
            throw new NotFoundException('User not found');
        }

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
        ProductBuild.admin = creator;

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