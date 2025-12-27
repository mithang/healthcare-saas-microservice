import { Module } from '@nestjs/common';
import { CommonModule } from '@libs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';

@Module({
    imports: [CommonModule],
    controllers: [ContentController],
    providers: [ContentService],
})
export class ContentModule { }
