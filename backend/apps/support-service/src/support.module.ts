import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app/common';
import { SupportController } from './support.controller';
import { SupportService } from './support.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
    ],
    controllers: [SupportController],
    providers: [SupportService],
})
export class SupportModule { }
