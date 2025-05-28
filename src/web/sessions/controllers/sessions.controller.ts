import { Controller } from '@nestjs/common';
import { SessionsService } from '../services/sessions.service';

@Controller()
export class SessionsController {
    constructor(private readonly sessionsService: SessionsService) {}
}
