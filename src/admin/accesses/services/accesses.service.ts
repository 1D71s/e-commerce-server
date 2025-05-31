import { Injectable, Logger } from '@nestjs/common';
import { IAccess } from '../interfaces/access.interface';
import { AccessRepository } from '../repositories/access.repository';
import { AccessEntity } from '../entities/access.entity';

@Injectable()
export class AccessesService {
    private readonly logger = new Logger(AccessesService.name);

    constructor(
      private readonly accessRepository: AccessRepository
    ) {}

    async getAll(): Promise<IAccess[]> {
        return this.accessRepository.findAll();
    }

    async getManyById(accesses: number[]) {
        const accessesEntities: AccessEntity[] = await Promise.all(
            accesses.map(async (item) => {
                try {
                    const accessEntity = await this.accessRepository.findById(item);
                    if (!accessEntity) {
                        return null; 
                    }
                    return accessEntity;
                } catch (error) {
                    this.logger.error(`Error fetching access with id ${item}:`, error);
                    return null; 
                }
            })
        );

        return accessesEntities.filter((entity) => entity !== null);
    }
}
