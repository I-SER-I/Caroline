import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TrelloComponent } from '../../components/trello.component';
import { MemberDto } from '../dto/member.dto';

@Injectable()
export class TrelloMembersService extends TrelloComponent {
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService);
  }

  public async getBoardMembers(
    userId: string,
    id: string,
  ): Promise<MemberDto[]> {
    const trello = await this.createTrello(userId);
    const boardMembers = await trello.getBoardMembers(id);
    const members = await Promise.all(
      await boardMembers.map(
        async (boardMember) => await trello.getMember(boardMember.id),
      ),
    );
    return members.map((member) => ({
      id: member.id,
      username: member.username,
      fullName: member.fullName,
      imageUrl: member.avatarUrl,
    }));
  }
}
