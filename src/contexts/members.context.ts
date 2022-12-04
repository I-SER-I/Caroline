import { Injectable } from '@nestjs/common';
import { MembersStrategy } from '../strategies/abstractions/members.strategy.interface';
import { MemberDto } from '../members/dto/member.dto';

@Injectable()
export class MembersContext {
  public membersStrategy: MembersStrategy;

  async getBoardMembers(userId: string, boardId: string): Promise<MemberDto[]> {
    return await this.membersStrategy.getBoardMembers(userId, boardId);
  }
}
