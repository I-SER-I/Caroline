import { Injectable } from '@nestjs/common';
import { TrelloApi } from '../../api/trello.api';
import { TagsStrategy } from '../abstractions/tags.strategy.interface';
import { TagDto } from '../../tags/dto/tag.dto';
import { color } from '../../tags/color.const';

@Injectable()
export class TrelloTagsStrategy implements TagsStrategy {
  constructor(private readonly trelloApi: TrelloApi) {}

  async getBoardTags(userId: string, boardId: string): Promise<TagDto[]> {
    const trello = await this.trelloApi.createTrello(userId);
    const labels = await trello.getLabelsForBoard(boardId);
    return labels.map((label) => ({
      color: color[label.color.split('_')[0]] ?? color.black,
      id: label.id,
      name: label.name,
    }));
  }
}
