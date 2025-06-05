import { Controller, Get, UseGuards } from '@nestjs/common';
import { AccessesService } from '../services/accesses.service';
import { IAccess } from '../interfaces/access.interface';
import { AccessGuard } from '../guards/access.guard';
import { EndpointAccess } from '../guards/endpoint-access.guard';
import { Endpoint } from '../enums/endpoint.enum';
import { JwtAuthAdminGuard } from '../../admin-auth/guards/auth.admin.guard';

@Controller()
@UseGuards(JwtAuthAdminGuard, AccessGuard)
export class AccessesController {
    constructor(private readonly accessesService: AccessesService) {}

    @Get()
    @EndpointAccess(Endpoint.GET_ACCESSES)
    async getAll(): Promise<IAccess[]> {
        return this.accessesService.getAll();
    }
}