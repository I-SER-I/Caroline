import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import * as Trello from 'trello';

@Injectable()
export abstract class TrelloService {
  protected constructor(protected readonly prismaService: PrismaService) {}

  protected async createTrello(userId: string): Promise<Trello> {
    const credentials = await this.prismaService.trelloCredential.findFirst({
      where: {
        id: userId,
      },
    });
    return new Trello(credentials.apiKey, credentials.oAuthToken);
  }
}
