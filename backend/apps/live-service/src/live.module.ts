import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app/common';
import { LiveController } from './live.controller';
import { LiveService } from './live.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
    ],
    controllers: [LiveController],
    providers: [LiveService],
})
export class LiveModule { }
