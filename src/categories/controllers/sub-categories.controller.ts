import { Controller } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';

@Controller('sub-categories')
export class SubCategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}
}
