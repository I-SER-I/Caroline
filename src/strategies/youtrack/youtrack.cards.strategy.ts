import { CardsStrategy } from '../abstractions/cards.strategy.interface';
import { EdgeDto } from '../../cards/dto/edge.dto';
import { CardDto } from '../../cards/dto/card.dto';
import { YouTrackApi } from '../../api/youtrack.api';
import { PrismaService } from '../../prisma/prisma.service';

export class YoutrackCardsStrategy implements CardsStrategy {
  constructor(
    private readonly youtrackApi: YouTrackApi,
    private readonly prismaService: PrismaService,
  ) {}

  getBoardCardEdges(userId: string, boardId: string): Promise<EdgeDto[]> {
    return Promise.resolve([]);
  }

  getBoardCards(userId: string, boardId: string): Promise<CardDto[]> {
    return Promise.resolve([]);
  }
}
