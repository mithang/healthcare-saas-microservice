import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app/common';
import { AnalyticController } from './analytic.controller';
import { AnalyticService } from './analytic.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
    ],
    controllers: [AnalyticController],
    providers: [AnalyticService],
})
export class AnalyticModule { }
