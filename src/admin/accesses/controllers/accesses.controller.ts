import { Controller, Get } from '@nestjs/common';
import { AccessesService } from '../services/accesses.service';

@Controller('accesses')
export class AccessesController {
    constructor(private readonly accessesService: AccessesService) {}

    @Get()
    async getAll(): Promise<any> {
        return
    }
}
