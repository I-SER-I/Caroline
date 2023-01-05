import { Injectable } from '@nestjs/common';
import { TrelloApi } from '../../api/trello.api';
import { MembersStrategy } from '../abstractions/members.strategy.interface';
import { MemberDto } from '../../members/dto/member.dto';

@Injectable()
export class TrelloMembersStrategy implements MembersStrategy {
  constructor(private trelloApi: TrelloApi) {}

  async getBoardMembers(userId: string, id: string): Promise<MemberDto[]> {
    const trello = await this.trelloApi.createTrello(userId);
    const boardMembers = await trello.getBoardMembers(id);
    const members = await Promise.all(
      boardMembers.map(
        async (boardMember) => await trello.getMember(boardMember.id),
      ),
    );
    return members.map(
      (member) =>
        ({
          id: member.id,
          name: member.fullName,
          imageUrl: member.avatarUrl + '/50.png',
        } as MemberDto),
    );
  }
}
