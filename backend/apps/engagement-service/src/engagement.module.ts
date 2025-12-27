import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app/common';
import { EngagementController } from './engagement.controller';
import { EngagementService } from './engagement.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
    ],
    controllers: [EngagementController],
    providers: [EngagementService],
})
export class EngagementModule { }
