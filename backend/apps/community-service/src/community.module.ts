import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app/common';
import { CommunityController } from './community.controller';
import { CommunityService } from './community.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        PrismaModule,
    ],
    controllers: [CommunityController],
    providers: [CommunityService],
})
export class CommunityModule { }
