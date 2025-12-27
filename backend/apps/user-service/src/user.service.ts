import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/common';
import { User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async createUser(data: any): Promise<User> {
    const userId = data.userId || uuidv4();
    return this.prisma.user.create({
      data: {
        userId,
        email: data.email,
        password: data.password,
        name: data.name,
      },
    });
  }

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUser(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async getUserById(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { userId } });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async updateUser(id: number, data: any): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  async createRole(data: any) {
    return this.prisma.role.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });
  }

  async getRoles() {
    return this.prisma.role.findMany({
      include: { permissions: true },
    });
  }

  async getRole(id: number) {
    return this.prisma.role.findUnique({
      where: { id },
      include: { permissions: true },
    });
  }

  async updateRole(id: number, data: any) {
    return this.prisma.role.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
      },
    });
  }

  async deleteRole(id: number) {
    return this.prisma.role.delete({ where: { id } });
  }
}
