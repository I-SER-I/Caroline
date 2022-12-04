import { Injectable } from '@nestjs/common';
import { StatesStrategy } from '../strategies/abstractions/states.strategy.inteface';
import { StateDto } from '../states/dto/state.dto';

@Injectable()
export class StatesContext {
  public statesStrategy: StatesStrategy;

  async getBoardStates(userId: string, boardId: string): Promise<StateDto[]> {
    return await this.statesStrategy.getBoardStates(userId, boardId);
  }
}
