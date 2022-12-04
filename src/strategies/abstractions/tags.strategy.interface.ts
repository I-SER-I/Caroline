import { TagDto } from '../../tags/dto/tag.dto';

export interface TagsStrategy {
  getBoardTags(userId: string, boardId: string): Promise<TagDto[]>;
}
