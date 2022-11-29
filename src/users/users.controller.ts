import {
  Body,
  Controller,
  Get,
  Post,
  ConflictException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from '@prisma/client';
import { Session } from '../decorators/session.decorator';
import { SessionContainer } from 'supertokens-node/recipe/session';
import { deleteUser } from 'supertokens-node';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({ description: 'User created' })
  @ApiBadRequestResponse({ description: 'User not created' })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ description: 'User found' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Get()
  @UseGuards(new AuthGuard())
  async getUserById(@Session() session: SessionContainer): Promise<User> {
    const userId = session.getUserId();
    return await this.usersService.getUserById(userId);
  }

  @Get('/me')
  @UseGuards(new AuthGuard())
  async getMe(@Session() session: SessionContainer): Promise<User> {
    const me = await this.getUserById(session);

    if (!me) {
      const userId = session.getUserId();
      await deleteUser(userId);
      throw new ConflictException();
    }

    return me;
  }
}
