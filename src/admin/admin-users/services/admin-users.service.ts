import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { AdminUserRepository } from '../repositories/admin-user.repository';
import { IAdminUser } from '../interfaces/admin-user.interface';
import { IMessage } from '../../../common/dto/responses/message.response';
import { CreateAdminUserDto } from '../dtos/create-admin-user.dto';
import { UpdateAdminUserDto } from '../dtos/update-admin-user.dto';
import { genSaltSync, hashSync } from 'bcrypt';
import { RoleRepository } from '../../roles/repositories/role.repository';

@Injectable()
export class AdminUsersService {
    constructor(
        private readonly adminRepository: AdminUserRepository,
        private readonly roleRepository: RoleRepository,
    ) {}

    async getAll(): Promise<IAdminUser[]> {
        return this.adminRepository.getMany();
    }

    async createAdminUser(dto: CreateAdminUserDto): Promise<IMessage> {
        const { email, password, roleId, name } = dto;
        const existingAdmin = await this.adminRepository.getOne({ where: { email } });

        if (existingAdmin) {
            throw new ConflictException('Admin with this email already exists.');
        }

        const role = await this.roleRepository.findByFields({ id: roleId });

        if (!role) {
            throw new NotFoundException('Role not found.');
        }

        const hashedPassword = this.hashPassword(password);

        const newAdmin = this.adminRepository.create({
            email,
            password: hashedPassword,
            role,
            name,
        });

        await this.adminRepository.save(newAdmin);
        return { message: 'Admin created successfully.' };
    }

    async updateAdminUser(dto: UpdateAdminUserDto, adminId: number): Promise<IMessage> {
        const { email, password, roleId, name } = dto;

        const admin = await this.adminRepository.getOne({ where: { id: adminId } });
        if (!admin) {
            throw new NotFoundException('Admin not found.');
        }

        if (email && email !== admin.email) {
            const existingAdmin = await this.adminRepository.getOne({ where: { email } });
            if (existingAdmin) {
                throw new ConflictException('Admin with this email already exists.');
            }
            admin.email = email;
        }

        if (password) {
            admin.password = this.hashPassword(password);
        }

        if (roleId && roleId !== admin.role.id) {
            const role = await this.roleRepository.findByFields({ id: roleId });
            if (!role) {
                throw new NotFoundException('Role not found.');
            }
            admin.role = role;
        }

        if (name) {
            admin.name = name;
        }

        await this.adminRepository.save(admin);

        return { message: 'Admin updated successfully.' };
    }


    async deleteAdminUser(id: number): Promise<IMessage> {
        const admin = await this.adminRepository.getOne({ where: { id } });
        if (!admin) throw new NotFoundException('Admin not found.');

        await this.adminRepository.remove(admin);
        return { message: 'Admin deleted successfully.' };
    }

    private hashPassword(password: string): string {
        return hashSync(password, genSaltSync(10))
    }
}
