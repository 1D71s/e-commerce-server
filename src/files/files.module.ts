import { Module } from '@nestjs/common';
import { FilesService } from './services/files.service';
import { FilesController } from './controllers/files.controller';
import { UsersModule } from 'src/web/users/users.module';

@Module({
    imports: [UsersModule],
    controllers: [FilesController],
    providers: [FilesService],
    exports: [FilesService],
})
export class FilesModule {}
