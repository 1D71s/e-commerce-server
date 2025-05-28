import { Injectable } from '@nestjs/common';
import { IAccess } from '../interfaces/access.interface';
import { AccessRepository } from '../repositories/access.repository';

@Injectable()
export class AccessesService {
    constructor(
      private readonly accessRepository: AccessRepository
    ) {}

    async getAll(): Promise<IAccess[]> {
        return this.accessRepository.findAll();
    }
}
