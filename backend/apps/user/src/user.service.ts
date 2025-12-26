import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/common';
import { User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async createUser(email: string, password: string, name?: string): Promise<User> {
    const userId = uuidv4(); // Generate a unique userId
    return this.prisma.user.create({
      data: { userId, email, password, name },
    });
  }

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserById(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { userId } });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async updateUser(userId: string, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({
      where: { userId },
      data,
    });
  }

  async deleteUser(userId: string): Promise<User> {
    return this.prisma.user.delete({ where: { userId } });
  }

  async createRole(name: string, description?: string) {
    return this.prisma.role.create({
      data: { name, description },
    });
  }

  async getRoles() {
    return this.prisma.role.findMany({
      include: { permissions: true },
    });
  }
}
