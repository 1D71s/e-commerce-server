import { Injectable, NotFoundException } from '@nestjs/common';
import { BasketRepository } from '../repositories/basket.repository';
import { AddCartDto } from '../dtos/add-cart.dto';
import { IMessage } from '../../../common/dto/responses/message.response';
import { ICartItem } from '../interfaces/cart-item.interface';
import { ProductsRepository } from '../../products/repositories/product.repository';
import { UserRepository } from '../../users/repositories/user.repository';

@Injectable()
export class BasketsService {
    constructor(
        private readonly basketRepository: BasketRepository,
        private readonly productsRepository: ProductsRepository,
        private readonly usersRepository: UserRepository,
    ) {}

    async getAllFromBaskets(userId: number):  Promise<ICartItem[]> {
        return await this.basketRepository.getMany({
            where: { user: { id: userId } }
        }) || []
    }

    async updateBasket(dto: AddCartDto, userId: number): Promise<IMessage> {
        const { productId, quantity } = dto;
        const cart = await this.basketRepository.getOne({
            where: { user: { id: userId }, product: { id: productId } },
        })

        if (!cart) {
            const user = await this.usersRepository.findById(userId);

            if (!user) throw new NotFoundException("User not found")

            const product = await this.productsRepository.getOne({
                where: { id: productId }
            })

            if (!product) throw new NotFoundException("Product not found")

            const newCart = this.basketRepository.create({
                quantity,
                product,
                user,
            })

            await this.basketRepository.save(newCart);
            return { message: "Basket update successfully" };
        }

        await this.basketRepository.update(cart.id, { quantity });
        return { message: "Basket update successfully" };
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
