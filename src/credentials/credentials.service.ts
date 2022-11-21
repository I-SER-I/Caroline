import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CredentialsService {
  constructor(private readonly prismaService: PrismaService) {}

  async getCredentials(userId: string) {
    return await this.prismaService.trelloCredential.findMany({
      where: {
        id: userId,
      },
    });
  }
}
