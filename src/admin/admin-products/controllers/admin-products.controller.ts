import { Controller } from '@nestjs/common';
import { AdminProductsService } from '../services/admin-products.service';

@Controller('admin-products')
export class AdminProductsController {
    constructor(private readonly adminProductsService: AdminProductsService) {}
}
