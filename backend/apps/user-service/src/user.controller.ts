import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @MessagePattern({ cmd: 'createUser' })
  createUser(@Payload() data: { email: string; password: string; name?: string }): Promise<User> {
    return this.userService.createUser(data.email, data.password, data.name);
  }

  @MessagePattern({ cmd: 'getUsers' })
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @MessagePattern({ cmd: 'getUserById' })
  getUserById(@Payload() id: string): Promise<User> {
    // @ts-ignore
    return this.userService.getUserById(id);
  }

  @MessagePattern({ cmd: 'getUserByEmail' })
  getUserByEmail(@Payload() email: string): Promise<User> {
    // @ts-ignore
    return this.userService.getUserByEmail(email);
  }

  @MessagePattern({ cmd: 'updateUser' })
  updateUser(
    @Payload() data: { id: string; userData: Partial<User> },
  ): Promise<User> {
    return this.userService.updateUser(data.id, data.userData);
  }

  @MessagePattern({ cmd: 'deleteUser' })
  deleteUser(@Payload() id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }

  @MessagePattern({ cmd: 'createRole' })
  createRole(@Payload() data: { name: string; description?: string }) {
    return this.userService.createRole(data.name, data.description);
  }

  @MessagePattern({ cmd: 'getRoles' })
  getRoles() {
    return this.userService.getRoles();
  }
}
