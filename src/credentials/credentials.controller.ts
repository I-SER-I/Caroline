import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CredentialsService } from './credentials.service';
import { CredentialsDto } from './dto/credentials.dto';
import { Session } from '../decorators/session.decorator';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { ProjectManagementSystemTypeEnum } from '../strategies/projectManagementSystemType.enum';

@ApiTags('credentials')
@UseGuards(new AuthGuard())
@Controller('credentials')
export class CredentialsController {
  constructor(private readonly credentialsService: CredentialsService) {}

  @Post()
  @ApiOperation({
    summary: 'Add credentials',
  })
  @ApiQuery({ name: 'type', enum: ProjectManagementSystemTypeEnum })
  @ApiCreatedResponse({
    description: 'Credentials added',
    type: CredentialsDto,
  })
  async addCredentials(
    @Session() session: SessionContainer,
    @Query('type') type: ProjectManagementSystemTypeEnum,
    @Body() config: string,
  ) {
    return await this.credentialsService.addCredentials({
      userId: session.getUserId(),
      config: config,
      apiService: type,
    });
  }

  @Put()
  @ApiOperation({
    summary: 'Update credentials',
  })
  @ApiQuery({ name: 'type', enum: ProjectManagementSystemTypeEnum })
  @ApiOkResponse({
    description: 'Credentials updated',
    type: CredentialsDto,
  })
  async updateCredentials(
    @Session() session: SessionContainer,
    @Query('type') type: ProjectManagementSystemTypeEnum,
    @Body() config: string,
  ) {
    return await this.credentialsService.updateCredentials({
      userId: session.getUserId(),
      config: config,
      apiService: type,
    });
  }

  @Delete()
  @ApiOperation({
    summary: 'Delete credentials',
  })
  @ApiQuery({ name: 'type', enum: ProjectManagementSystemTypeEnum })
  @ApiOkResponse({
    description: 'Credentials deleted',
    type: CredentialsDto,
  })
  async deleteCredentials(
    @Session() session: SessionContainer,
    @Query('type') type: ProjectManagementSystemTypeEnum,
  ) {
    return await this.credentialsService.deleteCredentials(
      session.getUserId(),
      type,
    );
  }

  @Get('/exists')
  @ApiOperation({
    summary: 'Check if credentials exist',
  })
  @ApiQuery({ name: 'type', enum: ProjectManagementSystemTypeEnum })
  @ApiOkResponse({
    description: 'Credentials exist',
    type: Boolean,
  })
  async credentialsExist(
    @Session() session: SessionContainer,
    @Query('type') type: ProjectManagementSystemTypeEnum,
  ) {
    return await this.credentialsService.credentialsExist(
      session.getUserId(),
      type,
    );
  }
}
