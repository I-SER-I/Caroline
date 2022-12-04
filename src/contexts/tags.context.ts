import { Injectable } from '@nestjs/common';
import { TagsStrategy } from '../strategies/abstractions/tags.strategy.interface';
import { TagDto } from '../tags/dto/tag.dto';

@Injectable()
export class TagsContext {
  public tagsStrategy: TagsStrategy;

  async getBoardTags(userId: string, boardId: string): Promise<TagDto[]> {
    return await this.tagsStrategy.getBoardTags(userId, boardId);
  }
}
