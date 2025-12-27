import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
    ],
    controllers: [ReportController],
    providers: [ReportService],
})
export class ReportModule { }
