import { Controller, Get, Post, Patch, Body, Param, Inject, ParseIntPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('gamification')
export class GamificationController {
    constructor(
        @Inject('GAMIFICATION_SERVICE') private readonly gamificationClient: ClientProxy,
    ) { }

    @Get('leaderboard')
    getLeaderboard() {
        return firstValueFrom(this.gamificationClient.send({ cmd: 'getLeaderboard' }, {}));
    }

    @Get('badges')
    getBadges() {
        return firstValueFrom(this.gamificationClient.send({ cmd: 'getBadges' }, {}));
    }

    @Get('rules')
    getPointRules() {
        return firstValueFrom(this.gamificationClient.send({ cmd: 'getPointRules' }, {}));
    }

    @Get('stats')
    getStats() {
        return firstValueFrom(this.gamificationClient.send({ cmd: 'getGamificationStats' }, {}));
    }

    @Post('badges')
    createBadge(@Body() data: any) {
        return firstValueFrom(this.gamificationClient.send({ cmd: 'createBadge' }, data));
    }

    @Patch('rules/:id')
    updatePointRule(@Param('id', ParseIntPipe) id: number, @Body('points') points: number) {
        return firstValueFrom(this.gamificationClient.send({ cmd: 'updatePointRule' }, { id, points }));
    }
}
