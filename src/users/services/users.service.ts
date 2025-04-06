import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
    ) {}

    async getOneByEmail(email: string, getPassword?: boolean): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { email }
        });          

        if (user && getPassword) {
            return user
        }

        return this.returnWithoutPassword(user);
    }

    async getOneById(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['tokens'],
        });          
        
        return this.returnWithoutPassword(user);
    }
    
    async create(user: Partial<UserEntity>): Promise<UserEntity> {
        const newUser = this.userRepository.create(user);
        const savedUser = await this.userRepository.save(newUser);
        
        return this.returnWithoutPassword(savedUser);
    }

    async update(id: number, user: Partial<UserEntity>): Promise<UserEntity> {
        const existingUser = await this.getOneById(id);
        if (!existingUser) {
            throw new NotFoundException('User not found');
        }
    
        this.userRepository.merge(existingUser, user);
    
        const updatedUser = await this.userRepository.save(existingUser);
    
        return this.returnWithoutPassword(updatedUser);
    }    
    
    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async changePassword(userId: number, hashedPassword: string): Promise<UserEntity> {
        const user = await this.getOneById(userId);

        if (!user) {
            throw new NotFoundException(`User with id ${userId} not found`);
        }

        user.password = hashedPassword;

        const updatedUser = await this.userRepository.save(user);

        return this.returnWithoutPassword(updatedUser);
    }

    private returnWithoutPassword(user: UserEntity): UserEntity  {
        if (user) {
            delete user.password;
    
            return user;
        }
    }
}