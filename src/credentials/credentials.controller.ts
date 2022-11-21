import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { Session } from '../decorators/session.decorator';
import { SessionContainer } from 'supertokens-node/lib/build/recipe/session';
import { CredentialsService } from './credentials.service';

@ApiTags('credentials')
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @UseGuards(new AuthGuard())
  @Get()
  async getCredentials(@Session() session: SessionContainer) {
    const userId = session.getUserId();
    return this.credentialsService.getCredentials(userId);
  }
}
