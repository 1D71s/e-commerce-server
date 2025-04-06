import { Controller } from '@nestjs/common';
import { BansService } from '../services/bans.service';

@Controller('bans')
export class BansController {
    constructor(private readonly bansService: BansService) {}
}
