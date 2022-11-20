import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { Session } from '../../decorators/session.decorator';
import { SessionContainer } from 'supertokens-node/lib/build/recipe/session';
import { TrelloBoardsService } from './trello.boards.service';

@ApiTags('trello-boards')
@Controller('trello-boards')
export class TrelloBoardsController {
  constructor(private readonly trelloBoardService: TrelloBoardsService) {}

  @UseGuards(new AuthGuard())
  @Get()
  async getBoards(@Session() session: SessionContainer) {
    const userId = session.getUserId();
    return await this.trelloBoardService.getBoards(userId);
  }

  @UseGuards(new AuthGuard())
  @Post(':url')
  async addBoard(
    @Param('url') url: string,
    @Session() session: SessionContainer,
  ) {
    const userId = session.getUserId();
    return await this.trelloBoardService.addBoard(userId, url);
  }

  @UseGuards(new AuthGuard())
  @Get(':id')
  async getBoard(
    @Param('id') id: string,
    @Session() session: SessionContainer,
  ) {
    return await this.trelloBoardService.getBoard(id);
  }
}
