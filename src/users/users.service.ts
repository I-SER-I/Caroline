import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userDto: Prisma.UserCreateInput): Promise<User> {
    return await this.prismaService.user.create({
      data: userDto,
    });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async getUserById(userId: string): Promise<User> {
    return await this.prismaService.user.findFirst({
      where: {
        superTokenId: userId,
      },
    });
  }
}
