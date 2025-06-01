import { Controller } from '@nestjs/common';
import { AdminOrdersService } from '../services/admin-orders.service';

@Controller('admin-orders')
export class AdminOrdersController {
    constructor(private readonly adminOrdersService: AdminOrdersService) {}
}
