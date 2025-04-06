import { Controller } from '@nestjs/common';
import { AdminCategoriesService } from '../services/admin-categories.service';

@Controller('admin-categories')
export class AdminCategoriesController {
    constructor(private readonly adminCategoriesService: AdminCategoriesService) {}
}
