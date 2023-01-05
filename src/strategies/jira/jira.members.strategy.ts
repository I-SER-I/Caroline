import { MembersStrategy } from '../abstractions/members.strategy.interface';
import { MemberDto } from '../../members/dto/member.dto';
import { JiraApi } from '../../api/jira.api';

export class JiraMembersStrategy implements MembersStrategy {
  constructor(private readonly jiraApi: JiraApi) {}

  async getBoardMembers(userId: string, boardId: string): Promise<MemberDto[]> {
    const jira = await this.jiraApi.createJira(userId);
    const members = await jira.user.all({});
    return members
      .filter((member) => member.accountType === 'atlassian')
      .map(
        (member) =>
          ({
            id: member.accountId,
            name: member.displayName,
            imageUrl: member.avatarUrls['48x48'],
          } as MemberDto),
      );
  }
}
