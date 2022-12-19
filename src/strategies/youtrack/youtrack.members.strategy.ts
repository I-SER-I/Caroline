import { Injectable } from '@nestjs/common';
import { MembersStrategy } from '../abstractions/members.strategy.interface';
import { MemberDto } from '../../members/dto/member.dto';
import { YouTrackApi } from '../../api/youtrack.api';

@Injectable()
export class YoutrackMembersStrategy implements MembersStrategy {
  constructor(private readonly youTrackApi: YouTrackApi) {}

  async getBoardMembers(userId: string, boardId: string): Promise<MemberDto[]> {
    const youtrack = await this.youTrackApi.createYoutrack(userId);
    const members = await Promise.all(
      (await youtrack.users.all()).map((user) => youtrack.users.byId(user.id)),
    );
    return members.map(
      (member) =>
        ({
          username: member.name,
          fullName: member.fullName,
          imageUrl: youtrack['baseUrl'].split('/api')[0] + member.avatarUrl,
        } as MemberDto),
    );
  }
}
