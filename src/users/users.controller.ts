import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({ description: 'User created' })
  @ApiBadRequestResponse({ description: 'User not created' })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'All Users' })
  @Get()
  async getUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ description: 'User found' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @Get(':userId')
  async getUserById(@Param('userId') userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }
}
