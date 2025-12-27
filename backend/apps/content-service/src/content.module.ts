import { Module } from '@nestjs/common';
import { PrismaService } from './prisma';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';

@Module({
    imports: [],
    controllers: [ContentController],
    providers: [PrismaService, ContentService],
})
export class ContentModule { }
