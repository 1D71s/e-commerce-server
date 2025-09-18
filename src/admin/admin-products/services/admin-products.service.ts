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
import { StorageService } from '../../../storage/services/storage.service';
import { AdminUserRepository } from '../../admin-users/repositories/admin-user.repository';
import { IProductSize } from 'src/web/products/interfaces/product-size.interface';

@Injectable()
export class AdminProductsService {
    constructor(
        private readonly subCategoryRepository: SubCategoryRepository,
        private readonly productRepository: ProductsRepository,
        private readonly productImagesRepository: ProductImagesRepository,
        private readonly adminUserRepository: AdminUserRepository,
        private readonly productSizeRepository: ProductSizeRepository,
        private readonly storageService: StorageService,
    ) {}

    async deleteProduct(id: number): Promise<IMessage> {
        const product = await this.productRepository.getOne({
            where: { id },
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        await Promise.allSettled(
          product.images.map(async (image) => {
              await this.storageService.deleteFile(image.imageName)
          })
        )

        await this.productRepository.delete(product);

        return { message: 'Product deleted successfully' };
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
            sizes
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

        const productImages = await this.handleImages(images);
        const productSizes = await this.handleSizes(sizes)

        const ProductBuild = new IProduct();
        ProductBuild.price = price;
        ProductBuild.title = title;
        ProductBuild.mainPhoto = mainPhoto;
        ProductBuild.description = description;
        ProductBuild.subCategory = subCategory;
        ProductBuild.images = productImages;
        ProductBuild.admin = creator;
        ProductBuild.properties.sizes = productSizes

        await this.productRepository.save(ProductBuild);
        return { message: 'Product created successfully' };
    }

    private async handleImages(images: string[]): Promise<IProductImages[]> {
        if (!images.length) return [];
        
        return await this.productImagesRepository.getMany({
            where: { imageName: In(images) },
        });
    }

    private async handleSizes(sizes: number[]): Promise<IProductSize[]> {
        if (!sizes.length) return [];

        return await this.productSizeRepository.getMany({
            where: { id: In(sizes) },
        });
    }
}