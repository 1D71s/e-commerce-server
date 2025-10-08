import { Injectable, NotFoundException } from '@nestjs/common';
import { In } from 'typeorm';
import { IMessage } from 'src/common/dto/responses/message.response';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { CreateProductDto, PropertyItemsDto } from '../dtos/create-product.dto';
import { IProductImages } from 'src/web/products/interfaces/product-images.interface';
import { IProduct } from 'src/web/products/interfaces/product.interface';
import { ProductImagesRepository } from 'src/web/products/repositories/product-images.repository';
import { ProductsRepository } from 'src/web/products/repositories/product.repository';
import { ProductSizeRepository } from '../../../web/products/repositories/product-size.repository';
import { StorageService } from '../../../storage/services/storage.service';
import { AdminUserRepository } from '../../admin-users/repositories/admin-user.repository';
import { CategoryRepository } from 'src/web/categories/repositories/category.repository';
import { IGetManyPagination } from 'src/common/dto/responses/get-many-pagination.response';
import { GetProductsFiltersDto } from 'src/web/products/dtos/requests/get-products-filters.dto';
import { ProductPropertyEntity } from 'src/web/products/entities/product-property.entity';
import { ProductEntity } from 'src/web/products/entities/product.entity';
import { ProductColorEntity } from 'src/web/products/entities/product-color.entity';
import { ProductImagesEntity } from 'src/web/products/entities/product-images.entity';
import { ProductPropertyItemEntity } from 'src/web/products/entities/product-property-item.entity';

@Injectable()
export class AdminProductsService {
    constructor(
        private readonly productRepository: ProductsRepository,
        private readonly productImagesRepository: ProductImagesRepository,
        private readonly adminUserRepository: AdminUserRepository,
        private readonly productSizeRepository: ProductSizeRepository,
        private readonly storageService: StorageService,
        private readonly categoryRepository: CategoryRepository,
    ) {}

    async getManyByFilters(dto: GetProductsFiltersDto): Promise<IGetManyPagination<IProduct>> {
        const [products, total] = await this.productRepository.findManyByFilters(dto);
        return { total, data: products };
    }

    async deleteProducts(ids: number[]): Promise<IMessage> {
        const products = await this.productRepository.find({
            where: { id: In(ids) }, 
            relations: ["images"],
        });

        if (!products.length) {
            throw new NotFoundException('Products not found');
        }

        await Promise.allSettled(
            products.flatMap((product) => {
                const tasks: Promise<any>[] = [];

                if (product.mainPhoto) {
                    tasks.push(
                        this.storageService.deleteFile(product.mainPhoto).catch(() => null)
                    );
                }

                if (product.images?.length) {
                    tasks.push(
                        ...product.images.map(image =>
                            Promise.all([
                                this.storageService.deleteFile(image.imagePath).catch(() => null),
                                this.productImagesRepository.delete(image)
                            ])
                        )
                    );
                }

                return tasks;
            })
        );

        await this.productRepository.deleteMany(products);

        return { message: `${products.length} products deleted successfully` };
    }

    async deleteProductImage(id: number): Promise<IMessage> {
        const image = await this.productImagesRepository.getOne({
            where: { id }
        })

        if (!image) throw new NotFoundException()

        await this.storageService.deleteFile(image.imagePath)
        await this.productImagesRepository.delete(image as ProductImagesEntity)
        return { message: `images deleted successfully` };
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
        const { price, title, mainPhoto, description, categoryIds, images, sizes, colors, propertyItems } = dto;

        const creator = await this.adminUserRepository.getOne({ where: { id: adminId } });
        if (!creator) throw new NotFoundException('User not found');

        const categories = await this.categoryRepository.getManyByIds(categoryIds);
        if (!categories?.length) throw new NotFoundException('Subcategory not found');

        const productImages = await this.handleImages(images ?? []);
        const productColors = await this.handleColors(colors ?? []);
        const productPropertyItems = await this.handlePropertyItems(propertyItems ?? []);

        const productSizes = sizes?.length
            ? await this.productSizeRepository.getMany({ where: { id: In(sizes) } })
            : [];

        const product = new ProductEntity();
        product.price = price;
        product.title = title;
        product.mainPhoto = mainPhoto;
        product.description = description;
        product.images = productImages;
        product.admin = creator;
        product.category = categories;

        const property = new ProductPropertyEntity();
        property.product = product;
        property.colors = productColors;
        property.sizes = productSizes;
        property.propertyItems = productPropertyItems

        product.properties = property;

        await this.productRepository.save(product);

        return { message: 'Product created successfully' };
    }

    private async handleImages(images: string[]): Promise<ProductImagesEntity[]> {
        if (!images.length) return [];
        
        return await this.productImagesRepository.getMany({
            where: { imagePath: In(images) },
        });
    }

    private async handleColors(colorValues: string[]): Promise<ProductColorEntity[]> {
        if (!colorValues.length) return [];

        return colorValues.map(value => {
            const color = new ProductColorEntity();
            color.value = value;
            return color;
        });
    }

    private async handlePropertyItems(propertyItems: PropertyItemsDto[]): Promise<ProductPropertyItemEntity[]> {
        if (!propertyItems.length) return [];

        return propertyItems.map(item => {
            const propertyItem = new ProductPropertyItemEntity();
            propertyItem.key = item.key
            propertyItem.value = item.value;
            return propertyItem;
        });
    }

    async getProductImages(productId: number): Promise<IProductImages[]> {
        return this.productImagesRepository.getMany({
            where: { product: { id: productId } }
        })
    }

    async addImagesToProduct(productId: number, imagePaths: string[]) {
        const product = await this.productRepository.getOne({ where: { id: productId } });
        if (!product) throw new NotFoundException('Product not found');

        const imagesEntities: ProductImagesEntity[] = imagePaths.map(path => {
            const img = new ProductImagesEntity();
            img.imagePath = path; 
            img.product = product;
            return img;
        });

        await this.productImagesRepository.saveMany(imagesEntities);

        return { message: `${imagesEntities.length} images added to product` };
    }
}