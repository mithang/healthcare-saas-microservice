import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LiveService } from './live.service';

@Controller()
export class LiveController {
    constructor(private readonly liveService: LiveService) { }

    @MessagePattern({ cmd: 'getLiveConfig' })
    getLiveConfig() {
        return this.liveService.getLiveConfig();
    }

    @MessagePattern({ cmd: 'updateLiveConfig' })
    updateLiveConfig(payload: { id: number, data: any }) {
        return this.liveService.updateLiveConfig(payload.id, payload.data);
    }

    @MessagePattern({ cmd: 'getLiveMessages' })
    getLiveMessages(payload: { livestreamId: number }) {
        return this.liveService.getLiveMessages(payload.livestreamId);
    }

    @MessagePattern({ cmd: 'sendLiveMessage' })
    sendLiveMessage(data: any) {
        return this.liveService.sendLiveMessage(data);
    }
}
