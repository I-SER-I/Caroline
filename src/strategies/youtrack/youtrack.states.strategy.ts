import { StatesStrategy } from '../abstractions/states.strategy.inteface';
import { StateDto } from '../../states/dto/state.dto';
import { YouTrackApi } from '../../api/youtrack.api';

export class YoutrackStatesStrategy implements StatesStrategy {
  constructor(private readonly youtrackApi: YouTrackApi) {}

  async getBoardStates(userId: string, boardId: string): Promise<StateDto[]> {
    const youtrack = await this.youtrackApi.createYoutrack(userId);
    return await Promise.all([]);
  }
}
