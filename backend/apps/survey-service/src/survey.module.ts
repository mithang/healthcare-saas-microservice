import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app/common';
import { SurveyController } from './survey.controller';
import { SurveyService } from './survey.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
    ],
    controllers: [SurveyController],
    providers: [SurveyService],
})
export class SurveyModule { }
