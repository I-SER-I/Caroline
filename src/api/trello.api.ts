import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import * as Trello from 'trello';

@Injectable()
export class TrelloApi {
  constructor(private readonly prismaService: PrismaService) {}

  public async createTrello(userId: string): Promise<Trello> {
    const credentials = await this.prismaService.credential.findFirst({
      where: {
        userId: userId,
        apiService: 'trello',
      },
    });
    return new Trello(credentials.apiKey, credentials.oAuthToken);
  }
}
