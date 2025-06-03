import { Body, Controller, Delete, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { AdminOrdersService } from '../services/admin-orders.service';
import { IMessage } from '../../../common/dto/responses/message.response';
import { AccessGuard } from '../../accesses/guards/access.guard';
import { JwtAuthAdminGuard } from '../../admin-auth/guards/auth.admin.guard';
import { EndpointAccess } from '../../accesses/guards/endpoint-access.guard';
import { Endpoint } from '../../accesses/enums/endpoint.enum';
import { GetOrdersFilterDto } from '../dtos/requests/get-orders-filter.dto';
import { IGetManyPagination } from '../../../web/orders/dtos/responses/get-many-pagination.response';
import { OrderEntity } from '../../../web/orders/entities/order.entity';
import { HandleOrderDto } from '../dtos/requests/handle-order.dto';

@Controller()
export class AdminOrdersController {
    constructor(private readonly adminOrdersService: AdminOrdersService) {}

    @Get()
    @UseGuards(JwtAuthAdminGuard, AccessGuard)
    @EndpointAccess(Endpoint.HANDLE_ORDER)
    async getOrders(@Query() dto: GetOrdersFilterDto): Promise<IGetManyPagination<OrderEntity>> {
        return this.adminOrdersService.getOrdersWithFilters(dto);
    }

    @Patch('handle/:id')
    @UseGuards(JwtAuthAdminGuard, AccessGuard)
    @EndpointAccess(Endpoint.HANDLE_ORDER)
    async handleOrders(@Param('id') id: number, @Body() dto: HandleOrderDto): Promise<IMessage> {
        return this.adminOrdersService.handleOrders(dto, id);
    }

    @Delete('delete/:id')
    @UseGuards(JwtAuthAdminGuard, AccessGuard)
    @EndpointAccess(Endpoint.DELETE_ORDER)
    async deleteOrder(@Param('id') id: number): Promise<IMessage> {
        return this.adminOrdersService.deleteOrder(id);
    }
}
