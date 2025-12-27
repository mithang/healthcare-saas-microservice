import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app/common';
import { GamificationController } from './gamification.controller';
import { GamificationService } from './gamification.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
    ],
    controllers: [GamificationController],
    providers: [GamificationService],
})
export class GamificationModule { }
