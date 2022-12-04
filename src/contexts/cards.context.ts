import { Injectable } from '@nestjs/common';
import { CardsStrategy } from '../strategies/abstractions/cards.strategy.interface';
import { CardDto } from '../cards/dto/card.dto';
import { EdgeDto } from '../cards/dto/edge.dto';

@Injectable()
export class CardsContext {
  public cardsStrategy: CardsStrategy;

  async getBoardCards(userId: string, boardId: string): Promise<CardDto[]> {
    return await this.cardsStrategy.getBoardCards(userId, boardId);
  }

  async getBoardCardEdges(
    userId: string,
    boardId: string,
    cardId: string,
  ): Promise<EdgeDto[]> {
    return await this.cardsStrategy.getBoardCardEdges(userId, boardId, cardId);
  }
}
