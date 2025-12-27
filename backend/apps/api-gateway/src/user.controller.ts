import { Controller, Get, Post, Put, Delete, Body, Param, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('users')
export class UserController {
    constructor(
        @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    ) { }

    @Get()
    async getUsers() {
        return firstValueFrom(this.userClient.send({ cmd: 'getUsers' }, {}));
    }

    @Get(':id')
    async getUser(@Param('id') id: string) {
        return firstValueFrom(this.userClient.send({ cmd: 'getUser' }, parseInt(id)));
    }

    @Post()
    async createUser(@Body() body: any) {
        return firstValueFrom(this.userClient.send({ cmd: 'createUser' }, body));
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() body: any) {
        return firstValueFrom(this.userClient.send({ cmd: 'updateUser' }, { id: parseInt(id), ...body }));
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        return firstValueFrom(this.userClient.send({ cmd: 'deleteUser' }, parseInt(id)));
    }
}
