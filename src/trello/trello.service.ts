import { Injectable } from '@nestjs/common';
import * as Trello from 'trello';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, TrelloCredential } from '@prisma/client';
import { TrelloCredentialDto } from './dto/trelloCredentials.dto';
import { Member } from '../models/member';

@Injectable()
export class TrelloService {
  constructor(private readonly prismaService: PrismaService) {}

  public async auth(
    userId: string,
    trelloCredentialDto: TrelloCredentialDto,
  ): Promise<TrelloCredential> {
    const trelloCredentialCreateInput: Prisma.TrelloCredentialCreateInput = {
      id: userId,
      apiKey: trelloCredentialDto.apiKey,
      oAuthToken: trelloCredentialDto.oAuthToken,
    };

    return await this.prismaService.trelloCredential.create({
      data: trelloCredentialCreateInput,
    });
  }

  public async getBoards(userId: string): Promise<any> {
    const trello = await this.createTrello(userId);
    return await trello.getBoards('me');
  }

  public async addBoard(userId: string, url: string): Promise<any> {
    const boards = await this.getBoards(userId);
    const boardId = boards.filter((board) => board.url === url)[0].id;
  }

  public async getBoardMembers(userId: string, url: string): Promise<Member[]> {
    const trello = await this.createTrello(userId);
    const boards = await this.getBoards(userId);
    const boardId = boards.filter((board) => board.url === url)[0].id;
    const members = await Promise.all(
      (
        await trello.getBoardMembers(boardId)
      ).map(async (member) => await trello.getMember(member.id)),
    );

    return members.map(
      (member) => new Member(member.id, member.fullName, member.avatarUrl),
    );
  }

  private async createTrello(userId: string): Promise<Trello> {
    const credentials = await this.prismaService.trelloCredential.findFirst({
      where: {
        id: userId,
      },
    });
    return new Trello(credentials.apiKey, credentials.oAuthToken);
  }
}
