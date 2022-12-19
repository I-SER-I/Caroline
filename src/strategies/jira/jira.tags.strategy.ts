import { TagsStrategy } from '../abstractions/tags.strategy.interface';
import { TagDto } from '../../tags/dto/tag.dto';
import { JiraApi } from '../../api/jira.api';
import { color } from '../../tags/color.const';

export class JiraTagsStrategy implements TagsStrategy {
  constructor(private readonly jiraApi: JiraApi) {}

  async getBoardTags(userId: string, boardId: string): Promise<TagDto[]> {
    const jira = await this.jiraApi.createJira(userId);
    const tags = await jira.labels.getAllLabels();
    return tags.values.map(
      (tagName) =>
        ({
          id: tagName,
          name: tagName,
          color: color.black,
        } as TagDto),
    );
  }
}
