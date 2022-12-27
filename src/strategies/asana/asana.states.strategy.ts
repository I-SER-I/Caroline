import { AsanaApi } from '../../api/asana.api';
import { StatesStrategy } from '../abstractions/states.strategy.inteface';
import { StateDto } from '../../states/dto/state.dto';

export class AsanaStatesStrategy implements StatesStrategy {
  constructor(private readonly asanaApi: AsanaApi) {}

  async getBoardStates(userId: string, boardId: string): Promise<StateDto[]> {
    const asana = await this.asanaApi.createAsana(userId);
    const states = await asana.sections.getSectionsForProject(boardId);
    return states.data.map((state) => ({
      id: state.gid,
      name: state.name,
    }));
  }
}
