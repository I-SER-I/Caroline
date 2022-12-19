import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Youtrack } from 'youtrack-rest-client';

@Injectable()
export class YouTrackApi {
  constructor(private readonly prismaService: PrismaService) {}

  public async createYoutrack(userId: string): Promise<Youtrack> {
    const credentials = await this.prismaService.credential.findFirst({
      where: {
        userId: userId,
        apiService: 'youtrack',
      },
    });
    return new Youtrack({
      baseUrl: credentials.config['baseUrl'],
      token: credentials.config['token'],
    });
  }
}
