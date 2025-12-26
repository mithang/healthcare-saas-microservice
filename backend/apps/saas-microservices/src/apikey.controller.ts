import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('apikeys')
export class ApikeyController {
    constructor(
        @Inject('APIKEY_SERVICE') private readonly apikeyClient: ClientProxy,
    ) { }

    @Post()
    createApiKey(@Body() body: { userId: string; name: string }): Observable<any> {
        return this.apikeyClient.send({ cmd: 'apikey.create' }, body);
    }

    @Get()
    getApiKeys(@Query('userId') userId: string): Observable<any> {
        return this.apikeyClient.send({ cmd: 'apikey.list' }, userId);
    }
}
