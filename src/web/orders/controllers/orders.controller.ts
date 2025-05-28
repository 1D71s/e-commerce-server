import { Controller } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';

@Controller()
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}
}
