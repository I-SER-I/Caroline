import { AsanaApi } from '../../api/asana.api';
import { TagsStrategy } from '../abstractions/tags.strategy.interface';
import { TagDto } from '../../tags/dto/tag.dto';
import { color } from '../../tags/color.const';

export class AsanaTagsStrategy implements TagsStrategy {
  constructor(private readonly asanaApi: AsanaApi) {}

  async getBoardTags(userId: string, boardId: string): Promise<TagDto[]> {
    const asana = await this.asanaApi.createAsana(userId);
    const me = await asana.users.me();
    const allTags = await asana.tags.getTagsForWorkspace(me.workspaces[0].gid);
    const tags = await Promise.all(
      allTags.data.map(async (tag) => await asana.tags.getTag(tag.gid)),
    );
    return tags.map((tag) => ({
      id: tag.gid,
      name: tag.name,
      color: color[tag.color.split('-').pop()] ?? color.black,
    }));
  }
}
