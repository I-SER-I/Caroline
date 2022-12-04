import { Inject, Injectable } from '@nestjs/common';
import { TrelloApi } from '../../api/trello.api';
import { StatesStrategy } from '../abstractions/states.strategy.inteface';
import { StateDto } from '../../states/dto/state.dto';

@Injectable()
export class TrelloStatesStrategy implements StatesStrategy {
  constructor(private trelloApi: TrelloApi) {}

  async getBoardStates(userId: string, boardId: string): Promise<StateDto[]> {
    const trello = await this.trelloApi.createTrello(userId);
    const lists = await trello.getListsOnBoard(boardId);
    return lists.map((list) => {
      return {
        id: list.id,
        name: list.name,
      };
    });
  }
}
