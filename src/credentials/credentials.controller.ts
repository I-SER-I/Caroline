import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CredentialsService } from './credentials.service';
import { CredentialsDto } from './dto/credentials.dto';
import { Session } from '../decorators/session.decorator';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { CreateCredentialsDto } from './dto/createCredentials.dto';

@ApiTags('credentials')
@UseGuards(new AuthGuard())
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post('/trello')
  async addTrelloCredentials(
    @Session() session: SessionContainer,
    @Body() createCredentialsDto: CreateCredentialsDto,
  ) {
    const credentialsDto: CredentialsDto = {
      id: session.getUserId(),
      apiKey: createCredentialsDto.apiKey,
      oAuthToken: createCredentialsDto.oAuthToken,
    };
    return await this.credentialsService.addCredentials(credentialsDto);
  }
}
