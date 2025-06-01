import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto } from '../dtos/requests/create-order.dto';
import { User } from '../../../common/decorators/user.decorator';
import { IJwtPayload } from '../../auth/interfaces/jwt-payload-user.interface';
import { IMessage } from '../../../common/dto/responses/message.response';

@Controller()
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    async createOrder(@Body() dto: CreateOrderDto, @User() user: IJwtPayload): Promise<IMessage> {
        return this.ordersService.createOrder(dto, user.id);
    }
}
