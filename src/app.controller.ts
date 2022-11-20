import { Controller, Get, Render, Res, UseGuards } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthGuard } from './auth/auth.guard';
import { Session } from './decorators/session.decorator';
import { SessionContainer } from 'supertokens-node/lib/build/recipe/session';

@Controller()
export class AppController {
  constructor() {}

  @ApiCreatedResponse({
    isArray: false,
    description: 'Access accept',
  })
  @ApiBadRequestResponse({ description: 'Access deny' })
  @UseGuards(new AuthGuard())
  @Get()
  async auth(@Session() session: SessionContainer) {
    if (session !== undefined) {
      const userId = session.getUserId();
      return userId;
    } else {
      return 'amogus';
    }
  }

  @ApiOperation({ summary: 'Show login page' })
  @ApiOkResponse({ description: 'Display login page' })
  @Get('/')
  @Render('signin')
  start() {}

  @ApiOperation({ summary: 'Show login page' })
  @ApiOkResponse({ description: 'Display login page' })
  @Get('/signin')
  @Render('signin')
  signin() {}

  @ApiOperation({ summary: 'Show registration page' })
  @ApiOkResponse({ description: 'Display registration page' })
  @Get('/signup')
  @Render('signup')
  signup() {}

  @UseGuards(AuthGuard)
  @Get('/main')
  @Render('main')
  async main(@Session() session: SessionContainer, @Res() response) {
    if (session) {
      return session.getUserId();
    }
  }
}
