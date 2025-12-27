import { Controller, Get, Patch, Post, Body, Param, Inject, ParseIntPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('live')
export class LiveController {
    constructor(
        @Inject('LIVE_SERVICE') private readonly liveClient: ClientProxy,
    ) { }

    @Get('config')
    getLiveConfig() {
        return firstValueFrom(this.liveClient.send({ cmd: 'getLiveConfig' }, {}));
    }

    @Patch('config/:id')
    updateLiveConfig(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return firstValueFrom(this.liveClient.send({ cmd: 'updateLiveConfig' }, { id, data }));
    }

    @Get(':id/messages')
    getLiveMessages(@Param('id', ParseIntPipe) id: number) {
        return firstValueFrom(this.liveClient.send({ cmd: 'getLiveMessages' }, { livestreamId: id }));
    }

    @Post(':id/messages')
    sendLiveMessage(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
        return firstValueFrom(this.liveClient.send({ cmd: 'sendLiveMessage' }, { ...data, livestreamId: id }));
    }
}
