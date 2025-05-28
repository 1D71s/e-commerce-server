import { Injectable, Logger } from '@nestjs/common';
import { RoleEntity } from 'src/admin/roles/entities/role.entity';
import { RoleRepository } from 'src/admin/roles/repositories/role.repository';
import { SeedAccessService } from '../seed-access/seed-access.service';

@Injectable()
export class SeedRoleService {
    private readonly ADMIN_ROLE_NAME = 'admin';
    private readonly logger = new Logger(SeedRoleService.name);

    constructor(
        private readonly rolesRepository: RoleRepository,
        private readonly seedAccessesService: SeedAccessService
    ) {}

    async init(): Promise<RoleEntity> {
        this.logger.log('Starting role seeding process...');

        try {
            const accesses = await this.seedAccessesService.init();

            let role = await this.rolesRepository.findByFields({ name: this.ADMIN_ROLE_NAME });

            if (role) {
                this.logger.log(`Role "${this.ADMIN_ROLE_NAME}" already exists. Updating accesses.`);
                role.accesses = accesses;
                role = await this.rolesRepository.save(role);
            } else {
                this.logger.log(`Role "${this.ADMIN_ROLE_NAME}" not found. Creating new role.`);
                role = await this.rolesRepository.create({
                    name: this.ADMIN_ROLE_NAME,
                    accesses,
                });
            }

            this.logger.log(`✅ Role seeding completed: ${role.name}`);
            return role;
        } catch (error) {
            this.logger.error('❌ Error during role seeding', error);
            throw error;
        }
    }
}