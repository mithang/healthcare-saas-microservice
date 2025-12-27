import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma';
import { SupportController } from './support.controller';
import { SupportService } from './support.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [SupportController],
    providers: [PrismaService, SupportService],
})
export class SupportModule { }
