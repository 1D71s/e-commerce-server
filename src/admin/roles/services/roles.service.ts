import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { IMessage } from 'src/common/dto/responses/message.response';
import { RoleRepository } from '../repositories/role.repository';
import { IRole } from '../interfaces/role.interface';
import { CreateRoleDto } from '../dtos/requests/create-role.dto';
import { UpdateRoleDto } from '../dtos/requests/update-role.dto';
import { AccessesService } from 'src/admin/accesses/services/accesses.service';

@Injectable()
export class RolesService {
    constructor(
        private readonly roleRepository: RoleRepository,
        private readonly accessesService: AccessesService
    ) {}

    async getAllRoles(): Promise<IRole[]> {
        return await this.roleRepository.findAll()
    }

    async createRole(dto: CreateRoleDto): Promise<IMessage> {
        const { name, accesses } = dto;
        const isExistRoleName = await this.roleRepository.findByFields({ name });

        if (isExistRoleName) throw new ConflictException("Role with such role is already exist");

        const accessesEntities = await this.accessesService.getManyById(accesses);

        await this.roleRepository.create({
            name,
            accesses: accessesEntities
        })
        
        return { message: 'Role has been created!' };
    }

    async updateRole(dto: UpdateRoleDto, roleId: number): Promise<IMessage> {
        const { name, accesses } = dto;

        const role = await this.roleRepository.findByFields({ id: roleId });

        if (!role) {
            throw new NotFoundException('Role was not found');
        }

        const accessesEntities = await this.accessesService.getManyById(accesses);

        role.name = name;
        role.accesses = accessesEntities;

        await this.roleRepository.save(role);

        return { message: 'Role has been updated!' };
    }
}