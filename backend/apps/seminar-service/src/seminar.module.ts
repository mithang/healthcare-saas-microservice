import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app/common';
import { SeminarController } from './seminar.controller';
import { SeminarService } from './seminar.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
    ],
    controllers: [SeminarController],
    providers: [SeminarService],
})
export class SeminarModule { }
