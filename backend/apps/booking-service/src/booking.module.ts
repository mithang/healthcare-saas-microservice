import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
    ],
    controllers: [BookingController],
    providers: [PrismaService, BookingService],
})
export class BookingModule { }
