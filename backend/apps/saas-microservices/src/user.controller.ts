import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('users')
export class UserController {
    constructor(
        @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    ) { }

    @Get()
    getUsers(): Observable<any> {
        return this.userClient.send({ cmd: 'getUsers' }, {});
    }
}
