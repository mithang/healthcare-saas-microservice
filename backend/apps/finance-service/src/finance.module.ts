import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app/common';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
    ],
    controllers: [FinanceController],
    providers: [FinanceService],
})
export class FinanceModule { }
