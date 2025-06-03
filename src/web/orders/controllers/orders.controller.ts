import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto } from '../dtos/requests/create-order.dto';
import { User } from '../../../common/decorators/user.decorator';
import { IJwtPayload } from '../../auth/interfaces/jwt-payload-user.interface';
import { IMessage } from '../../../common/dto/responses/message.response';
import { JwtAuthGuard } from '../../auth/guards/auth.guard';
import { OrderEntity } from '../entities/order.entity';
import { IGetManyPagination } from '../dtos/responses/get-many-pagination.response';

@Controller()
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get('user-orders')
    @UseGuards(JwtAuthGuard)
    async getAllUserOrders(@User() user: IJwtPayload): Promise<IGetManyPagination<OrderEntity>> {
        return this.ordersService.getAllUserOrders(user.id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createOrder(@Body() dto: CreateOrderDto, @User() user: IJwtPayload): Promise<IMessage> {
        return this.ordersService.createOrder(dto, user.id);
    }
}