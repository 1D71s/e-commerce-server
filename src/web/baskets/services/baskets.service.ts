import { Injectable, NotFoundException } from '@nestjs/common';
import { BasketRepository } from '../repositories/basket.repository';
import { AddCartDto } from '../dtos/add-cart.dto';
import { IMessage } from '../../../common/dto/responses/message.response';
import { ICartItem } from '../interfaces/cart-item.interface';

@Injectable()
export class BasketsService {
    constructor(
      private readonly basketRepository: BasketRepository
    ) {}

    async getAllFromBaskets(userId: number):  Promise<ICartItem[]> {
        return await this.basketRepository.getMany({
            where: { user: { id: userId } }
        }) || []
    }

    async updateBasket(dto: AddCartDto, userId: number): Promise<IMessage> {

        return { message: "Basket update successfully" }
    }

    async deletedFromBasket(id: number, userId: number): Promise<IMessage> {
        const cart = await this.basketRepository.getOne({
            where: { id, user: { id: userId } },
        })

        if (!cart) throw new NotFoundException("Cart not found")

        await this.basketRepository.delete(cart.id)
        return { message: "Basket deleted successfully" }
    }
}
