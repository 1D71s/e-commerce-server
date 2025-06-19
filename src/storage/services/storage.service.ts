import { Injectable, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { FilenameResponseDto } from '../dtos/response/filename-response.dto';

@Injectable()
export class StorageService {
    public readonly uploadPath = path.resolve(process.cwd(), 'uploads');

    constructor() {
        if (!fs.existsSync(this.uploadPath)) {
            fs.mkdirSync(this.uploadPath, { recursive: true });
        }
    }

    async saveFile(file: Express.Multer.File): Promise<FilenameResponseDto> {
        if (!file) {
            throw new NotFoundException('File not found');
        }

        const fileName = `${Date.now()}${path.extname(file.originalname)}`;
        const filePath = path.join(this.uploadPath, fileName);

        fs.writeFileSync(filePath, file.buffer);

        return { fileName };
    }

    async getFile(fileName: string, res: Response): Promise<void> {
        const filePath = path.join(this.uploadPath, fileName);
        
        if (!fs.existsSync(filePath)) {
            throw new NotFoundException('File not found');
        }

        res.sendFile(filePath);
    }

    async deleteFile(fileName: string): Promise<void> {
        const filePath = path.join(this.uploadPath, fileName);

        if (!fs.existsSync(filePath)) {
            throw new NotFoundException('File not found');
        }

        fs.unlinkSync(filePath);
    }
}
