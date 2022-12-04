import { MemberDto } from '../../members/dto/member.dto';

export interface MembersStrategy {
  getBoardMembers(userId: string, boardId: string): Promise<MemberDto[]>;
}
