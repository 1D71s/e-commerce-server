import { Injectable, Logger } from '@nestjs/common';
import { accesses } from 'src/admin/accesses/data/accesses';
import { AccessEntity } from 'src/admin/accesses/entities/access.entity';
import { AccessRepository } from 'src/admin/accesses/repositories/access.repository';

@Injectable()
export class SeedAccessService {
    private readonly logger = new Logger(SeedAccessService.name);

    constructor(
        private readonly accessRepository: AccessRepository
    ) {}

    async init(): Promise<AccessEntity[]> {
        this.logger.log('Starting access seeding process...');

        const existingAccesses = await this.accessRepository.findAll();

        const createdOrExistingAccesses: AccessEntity[] = [];

        for (const access of accesses) {
            const found = existingAccesses.find(
                a => a.title === access.title && a.category === access.category && a.endpoint === access.endpoint
            );

            if (found) {
                createdOrExistingAccesses.push(found);
                this.logger.log(`Access "${access.title}" already exists. Skipping creation.`);
            } else {
                const created = await this.accessRepository.create({
                    title: access.title,
                    category: access.category,
                    endpoint: access.endpoint,
                });
                createdOrExistingAccesses.push(created);
                this.logger.log(`Access "${access.title}" created.`);
            }
        }

        this.logger.log(`✅ Seeding process completed. Total accesses processed: ${createdOrExistingAccesses.length}`);
        return createdOrExistingAccesses;
    }
}
