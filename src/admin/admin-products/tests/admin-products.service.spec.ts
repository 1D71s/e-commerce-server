import { Test, TestingModule } from '@nestjs/testing';
import { AdminProductsService } from '../services/admin-products.service';
import { SubCategoryRepository } from '../../../categories/reposiroties/sub-category.repository';
import { ProductImagesRepository } from '../../../products/repositories/product-images.repository';
import { NotFoundException } from '@nestjs/common';
import { ProductsRepository } from '../../../products/repositories/product.repository';

describe('AdminProductsService', () => {
    let service: AdminProductsService;
    let productRepository: jest.Mocked<ProductsRepository>;
    let subCategoryRepository: jest.Mocked<SubCategoryRepository>;
    let productImagesRepository: jest.Mocked<ProductImagesRepository>;

    const mockProductRepository = {
        getOne: jest.fn(),
        delete: jest.fn(),
        save: jest.fn(),
    };

    const mockSubCategoryRepository = {
        getOne: jest.fn(),
    };

    const mockProductImagesRepository = {
        getMany: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
        providers: [
            AdminProductsService,
            {
                provide: ProductsRepository,
                useValue: mockProductRepository,
            },
            {
                provide: SubCategoryRepository,
                useValue: mockSubCategoryRepository,
            },
            {
                provide: ProductImagesRepository,
                useValue: mockProductImagesRepository,
            },
        ],
        }).compile();

        service = module.get<AdminProductsService>(AdminProductsService);
        productRepository = module.get(ProductsRepository);
        subCategoryRepository = module.get(SubCategoryRepository);
        productImagesRepository = module.get(ProductImagesRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('deleteProduct', () => {
        it('should delete a product successfully', async () => {
            const mockProduct = { id: 1 };
            mockProductRepository.getOne.mockResolvedValue(mockProduct);
            mockProductRepository.delete.mockResolvedValue(undefined);

            const result = await service.deleteProduct(1);

            expect(result).toEqual({ message: 'Product deleted successfully' });
            expect(mockProductRepository.getOne).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(mockProductRepository.delete).toHaveBeenCalledWith(mockProduct);
        });

        it('should throw NotFoundException when product not found', async () => {
            mockProductRepository.getOne.mockResolvedValue(null);

            await expect(service.deleteProduct(1)).rejects.toThrow(NotFoundException);
        });
    });

    describe('updateProduct', () => {
        it('should update a product successfully', async () => {
            const mockProduct = { id: 1, title: 'Old Title' };
            const updateDto = { title: 'New Title' };
            mockProductRepository.getOne.mockResolvedValue(mockProduct);
            mockProductRepository.save.mockResolvedValue({ ...mockProduct, ...updateDto });

            const result = await service.updateProduct(1, updateDto);

            expect(result).toEqual({ message: 'Product updated successfully' });
            expect(mockProductRepository.save).toHaveBeenCalledWith({ ...mockProduct, ...updateDto });
        });

        it('should throw NotFoundException when product not found', async () => {
            mockProductRepository.getOne.mockResolvedValue(null);

            await expect(service.updateProduct(1, {})).rejects.toThrow(NotFoundException);
        });
    });

    describe('createProduct', () => {
        it('should create a product successfully', async () => {
            const createDto = {
                price: 100,
                title: 'Test Product',
                mainPhoto: 'photo.jpg',
                description: 'Description',
                subcategoryId: 1,
                images: ['image1.jpg'],
            };

            const mockSubCategory = { id: 1 };
            const mockProductImages = [{ imageName: 'image1.jpg' }];

            mockSubCategoryRepository.getOne.mockResolvedValue(mockSubCategory);
            mockProductImagesRepository.getMany.mockResolvedValue(mockProductImages);
            mockProductRepository.save.mockResolvedValue({ ...createDto });

            const result = await service.createProduct(createDto);

            expect(result).toEqual({ message: 'Product created successfully' });
            expect(mockSubCategoryRepository.getOne).toHaveBeenCalledWith({
                where: { id: createDto.subcategoryId },
            });
            expect(mockProductRepository.save).toHaveBeenCalled();
        });

        it('should throw NotFoundException when subcategory not found', async () => {
            const createDto = {
                price: 100,
                title: 'Test Product',
                mainPhoto: 'photo.jpg',
                description: 'Description',
                subcategoryId: 1,
                images: [],
            };

            mockSubCategoryRepository.getOne.mockResolvedValue(null);

            await expect(service.createProduct(createDto)).rejects.toThrow(NotFoundException);
        });
    });
});