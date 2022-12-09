import { CardDto } from '../../cards/dto/card.dto';
import { EdgeDto } from '../../cards/dto/edge.dto';

export interface CardsStrategy {
  getBoardCards(userId: string, boardId: string): Promise<CardDto[]>;

  getBoardCardEdges(userId: string, boardId: string): Promise<EdgeDto[]>;
}
