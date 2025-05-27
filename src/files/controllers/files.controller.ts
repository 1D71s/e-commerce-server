import { Controller, Get, Param, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesService } from '../services/files.service';
import { Roles } from 'src/admin/roles/enums/roles.enum';
import { RolesGuard } from 'src/admin/roles/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { Role } from 'src/common/decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { FilenameResponseDto } from '../dtos/response/filename-response.dto';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post('upload')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Role(Roles.ADMIN, Roles.OWNER)
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<FilenameResponseDto> {
        return this.filesService.saveFile(file);
    }

    @Get('image/:fileName')
    async getFile(@Param('fileName') fileName: string, @Res() res: Response): Promise<void> {
        return this.filesService.getFile(fileName, res)
    }
}
