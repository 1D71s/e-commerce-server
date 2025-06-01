import { Injectable, Logger } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';
import { SeedRoleService } from '../seed-role/seed-role.service';
import { AdminUserRepository } from '../../../admin/admin-users/repositories/admin-user.repository';

@Injectable()
export class SeedAdminService {
    private readonly logger = new Logger(SeedRoleService.name);
    private ADMIN_EMAIL = process.env.ADMIN_EMAIL
    private ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

    constructor(
        private readonly adminRepository: AdminUserRepository,
        private readonly seedRoleService: SeedRoleService
    ) {}

    async run(): Promise<void> {
        const admin = await this.adminRepository.getOne({
            where: { email: this.ADMIN_EMAIL }
        })

        const role = await this.seedRoleService.init()

        if (!admin) {
            const password = this.hashPassword(this.ADMIN_PASSWORD);  

            const newAdmin = this.adminRepository.create({
                email: this.ADMIN_EMAIL,
                password,
                role
            });

            await this.adminRepository.save(newAdmin);
            this.logger.log('✅ Admin seeded successfully');
            return;
        }

        admin.role = role;
        await this.adminRepository.save(admin);
        this.logger.log('✅ Admin seeded successfully');
    }

    private hashPassword(password: string): string {
        return hashSync(password, genSaltSync(10))
    }
}
