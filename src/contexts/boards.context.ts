import { Injectable } from '@nestjs/common';
import { BoardsStrategy } from '../strategies/abstractions/boards.strategy.interface';
import { BoardDto } from '../boards/dto/board.dto';

@Injectable()
export class BoardsContext {
  public boardsStrategy: BoardsStrategy;

  async getBoards(userId: string): Promise<BoardDto[]> {
    return await this.boardsStrategy.getBoards(userId);
  }

  async getBoardByBoardId(userId: string, boardId: string): Promise<BoardDto> {
    return await this.boardsStrategy.getBoardByBoardId(userId, boardId);
  }

  async addBoardByUrl(userId: string, boardUrl: string): Promise<BoardDto> {
    return await this.boardsStrategy.addBoardByUrl(userId, boardUrl);
  }

  async deleteBoard(userId: string, boardId: string) {
    return await this.boardsStrategy.deleteBoard(userId, boardId);
  }
}
