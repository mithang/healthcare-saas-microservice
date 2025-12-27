import { Controller, Get, Post, Body, Param, Inject, ParseIntPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('support')
export class SupportController {
    constructor(
        @Inject('SUPPORT_SERVICE') private readonly supportClient: ClientProxy,
    ) { }

    @Get('chats')
    getSupportChats() {
        return firstValueFrom(this.supportClient.send({ cmd: 'getSupportChats' }, {}));
    }

    @Get('chats/:id/messages')
    getChatMessages(@Param('id', ParseIntPipe) id: number) {
        return firstValueFrom(this.supportClient.send({ cmd: 'getChatMessages' }, { chatId: id }));
    }

    @Post('chats/:id/messages')
    sendSupportMessage(@Param('id', ParseIntPipe) id: number, @Body() payload: { sender: string, content: string }) {
        return firstValueFrom(this.supportClient.send({ cmd: 'sendSupportMessage' }, { chatId: id, ...payload }));
    }
}
