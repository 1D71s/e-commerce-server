import { Injectable, Logger } from '@nestjs/common';
import { genSaltSync, hashSync } from 'bcrypt';
import { SeedRoleService } from '../seed-role/seed-role.service';
import { UserRepository } from 'src/web/users/repositories/user.repository';

@Injectable()
export class SeedUserService {
    private readonly logger = new Logger(SeedRoleService.name);
    private ADMIN_EMAIL = process.env.ADMIN_EMAIL
    private ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

    constructor(
        private readonly userRepository: UserRepository,
        private readonly seedRoleService: SeedRoleService
    ) {}

    async run() {
        const admin = await this.userRepository.findByEmail(this.ADMIN_EMAIL);
        const role = await this.seedRoleService.init()  

        if (!admin) {
            const password = this.hashPassword(this.ADMIN_PASSWORD);  

            const newAdmin = this.userRepository.create({
                email: this.ADMIN_EMAIL,
                password,
                role
            });

            await this.userRepository.save(newAdmin);
        }

        admin.role = role;
        await this.userRepository.save(admin); 
        this.logger.log('✅ User seeded successfully');
    }

    private hashPassword(password: string): string {
        return hashSync(password, genSaltSync(10))
    }
}
