import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import Asana from 'asana';

@Injectable()
export class AsanaApi {
  constructor(private readonly prismaService: PrismaService) {}

  public async createAsana(userId: string) {
    const credentials = await this.prismaService.credential.findFirst({
      where: {
        userId: userId,
        apiService: 'asana',
      },
    });
    return Asana.Client.create().useAccessToken(credentials.config['apiToken']);
  }
}
