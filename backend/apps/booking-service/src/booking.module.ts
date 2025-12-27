import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
    ],
    controllers: [BookingController],
    providers: [BookingService],
})
export class BookingModule { }
