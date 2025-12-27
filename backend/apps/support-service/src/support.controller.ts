import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { SupportService } from './support.service';

@Controller()
export class SupportController {
    constructor(private readonly supportService: SupportService) { }

    @MessagePattern({ cmd: 'getSupportChats' })
    getSupportChats() {
        return this.supportService.getSupportChats();
    }

    @MessagePattern({ cmd: 'getChatMessages' })
    getChatMessages(payload: { chatId: number }) {
        return this.supportService.getChatMessages(payload.chatId);
    }

    @MessagePattern({ cmd: 'sendSupportMessage' })
    sendSupportMessage(payload: { chatId: number, sender: string, content: string }) {
        return this.supportService.sendSupportMessage(payload.chatId, payload.sender, payload.content);
    }
}
