import { StateDto } from '../../states/dto/state.dto';

export interface StatesStrategy {
  getBoardStates(userId: string, boardId: string): Promise<StateDto[]>;
}
