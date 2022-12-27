import { AsanaApi } from '../../api/asana.api';
import { MembersStrategy } from '../abstractions/members.strategy.interface';
import { MemberDto } from '../../members/dto/member.dto';

export class AsanaMembersStrategy implements MembersStrategy {
  constructor(private readonly asanaApi: AsanaApi) {}

  async getBoardMembers(userId: string, boardId: string): Promise<MemberDto[]> {
    const asana = await this.asanaApi.createAsana(userId);
    const board = await asana.projects.getProject(boardId);
    const members = await Promise.all(
      board.members.map(
        async (member) => await asana.users.getUser(member.gid),
      ),
    );
    return members.map((member) => ({
      id: member.gid,
      name: member.name,
      fullName: member.name,
      imageUrl: member.photo?.image_60x60 ?? '',
    }));
  }
}
