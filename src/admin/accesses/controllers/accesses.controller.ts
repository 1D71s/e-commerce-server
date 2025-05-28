import { Controller, Get, UseGuards } from '@nestjs/common';
import { AccessesService } from '../services/accesses.service';
import { IAccess } from '../interfaces/access.interface';
import { JwtAuthGuard } from '../../../auth/guards/auth.guard';
import { AccessGuard } from '../guards/access.guard';
import { EndpointAccess } from '../guards/endpoint-access.guard';
import { Endpoint } from '../enums/endpoint.enum';

@Controller('accesses')
export class AccessesController {
    constructor(private readonly accessesService: AccessesService) {}

    @Get()
    @UseGuards(JwtAuthGuard, AccessGuard)
    @EndpointAccess(Endpoint.GET_ACCESSES)
    async getAll(): Promise<IAccess[]> {
        return this.accessesService.getAll();
    }
}