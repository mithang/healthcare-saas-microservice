import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('roles')
export class RoleController {
    constructor(
        @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    ) { }

    @Post()
    createRole(@Body() body: { name: string; description?: string }): Observable<any> {
        return this.userClient.send({ cmd: 'createRole' }, body);
    }

    @Get()
    getRoles(): Observable<any> {
        return this.userClient.send({ cmd: 'getRoles' }, {});
    }
}
