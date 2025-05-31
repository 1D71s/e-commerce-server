import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BasketsService } from '../services/baskets.service';
import { AddCartDto } from '../dtos/add-cart.dto';
import { User } from '../../../common/decorators/user.decorator';
import { IJwtPayload } from '../../auth/interfaces/jwt-payload-user.interface';
import { IMessage } from '../../../common/dto/responses/message.response';
import { ICartItem } from '../interfaces/cart-item.interface';
import { JwtAuthGuard } from '../../auth/guards/auth.guard';

@Controller()
@UseGuards(JwtAuthGuard)
export class BasketsController {
    constructor(private readonly basketsService: BasketsService) {}

    @Get()
    async getAllFromBaskets(@User() user: IJwtPayload): Promise<ICartItem[]> {
        return this.basketsService.getAllFromBaskets(user.id)
    }

    @Post("update")
    async updateBasket(@Body() dto: AddCartDto, @User() user: IJwtPayload): Promise<IMessage> {
        return this.basketsService.updateBasket(dto, user.id)
    }

    @Delete('delete/:id')
    async deleteBasket(@Param('id') id: number, @User() user: IJwtPayload): Promise<IMessage> {
        return this.basketsService.deletedFromBasket(id, user.id)
    }
}
