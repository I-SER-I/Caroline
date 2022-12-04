import { BoardDto } from '../../boards/dto/board.dto';

export interface BoardsStrategy {
  addBoardByUrl(userId: string, boardUrl: string): Promise<BoardDto>;

  getBoards(userId: string): Promise<BoardDto[]>;

  getBoardByBoardId(userId: string, boardId: string): Promise<BoardDto>;

  deleteBoard(userId: string, boardId: string): Promise<BoardDto>;
}
