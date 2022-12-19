import { TagsStrategy } from '../abstractions/tags.strategy.interface';
import { YouTrackApi } from '../../api/youtrack.api';
import { TagDto } from '../../tags/dto/tag.dto';

export class YoutrackTagsStrategy implements TagsStrategy {
  constructor(private readonly youtrackApi: YouTrackApi) {}

  async getBoardTags(userId: string, boardId: string): Promise<TagDto[]> {
    const youtrack = await this.youtrackApi.createYoutrack(userId);
    return (await youtrack.tags.all()).map((tag) => ({
      id: tag.id,
      name: tag.name,
      color: 'black',
    }));
  }
}
