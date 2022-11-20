import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { TrelloService } from './trello.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Session } from '../decorators/session.decorator';
import { SessionContainer } from 'supertokens-node/lib/build/recipe/session';
import { TrelloCredentialDto } from './dto/trelloCredentials.dto';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('trello')
@Controller('trello')
export class TrelloController {
  constructor(private readonly trelloService: TrelloService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({
    isArray: false,
    description: 'Access accept',
  })
  @ApiBadRequestResponse({ description: 'Access deny' })
  @UseGuards(new AuthGuard())
  @Post()
  async auth(
    @Session() session: SessionContainer,
    @Body() trelloCredential: TrelloCredentialDto,
  ) {
    const userId = session.getUserId();
    console.log(userId);
    return await this.trelloService.auth(userId, trelloCredential);
  }

  @ApiOperation({
    summary: 'Get all boards',
  })
  @UseGuards(new AuthGuard())
  @Get()
  async getBoards(@Session() session: SessionContainer) {
    const userId = session.getUserId();
    return await this.trelloService.getBoards(userId);
  }

  @UseGuards(new AuthGuard())
  @Post(':url')
  async addBoard(
    @Param('url') url: string,
    @Session() session: SessionContainer,
  ) {
    const userId = session.getUserId();
    return await this.trelloService.addBoard(userId, url);
  }
}
