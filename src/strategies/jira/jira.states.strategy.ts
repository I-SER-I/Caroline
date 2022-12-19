import { StatesStrategy } from '../abstractions/states.strategy.inteface';
import { StateDto } from '../../states/dto/state.dto';
import { JiraApi } from '../../api/jira.api';

export class JiraStatesStrategy implements StatesStrategy {
  constructor(private readonly jiraApi: JiraApi) {}

  async getBoardStates(userId: string, boardId: string): Promise<StateDto[]> {
    const jira = await this.jiraApi.createJira(userId);
    const states = await jira.statusCategory.getAllStatusCategories();
    return states.map((state) => ({
      id: state.id,
      name: state.name,
    }));
  }
}
