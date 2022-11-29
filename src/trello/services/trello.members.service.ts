import { Injectable } from '@nestjs/common';
import { TrelloService } from '../../abstractions/trello.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { MemberDto } from '../dto/member.dto';

@Injectable()
export class TrelloMembersService extends TrelloService {
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService);
  }

  async getBoardMembers(userId: string, id: string): Promise<MemberDto[]> {
    const trello = await this.createTrello(userId);
    const boardMembers = await trello.getBoardMembers(id);
    const members = await Promise.all(
      boardMembers.map(
        async (boardMember) => await trello.getMember(boardMember.id),
      ),
    );
    return members.map(
      (member: { id: any; username: any; fullName: any; avatarUrl: any }) => ({
        id: member.id,
        username: member.username,
        fullName: member.fullName,
        imageUrl: member.avatarUrl,
      }),
    );
  }
}
