import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app/common';
import { MarketingController } from './marketing.controller';
import { MarketingService } from './marketing.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
    ],
    controllers: [MarketingController],
    providers: [MarketingService],
})
export class MarketingModule { }
