import { Injectable } from '@nestjs/common';
import { AdminRepository } from '../repositories/admin.repository';

@Injectable()
export class AdminsService {
    constructor(
        private readonly adminRepository: AdminRepository
    ) {}
}
