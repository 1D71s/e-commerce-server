import { Controller, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { StorageService } from '../services/storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FilenameResponseDto } from '../dtos/response/filename-response.dto';
import { AccessGuard } from '../../admin/accesses/guards/access.guard';
import { EndpointAccess } from '../../admin/accesses/guards/endpoint-access.guard';
import { Endpoint } from '../../admin/accesses/enums/endpoint.enum';
import { JwtAuthAdminGuard } from '../../admin/admin-auth/guards/auth.admin.guard';

@Controller('storage')
export class StorageController {
    constructor(private readonly filesService: StorageService) {}

    @Post('upload')
    @UseGuards(JwtAuthAdminGuard, AccessGuard)
    @EndpointAccess(Endpoint.UPLOAD_FILE)
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FilenameResponseDto> {
        return this.filesService.saveFile(file);
    }

    @Get('image/:fileName')
    async getFile(@Param('fileName') fileName: string, @Res() res: Response): Promise<void> {
        return this.filesService.getFile(fileName, res)
    }
}
