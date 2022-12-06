import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from '../users.service';
import {
  Context,
  createMockContext,
  MockContext,
} from '../../prisma/tests/prisma.service.mock';
import { User } from '@prisma/client';
import { usersStub } from './users.stub';
import { CreateUserDto } from '../dto/createUser.dto';

describe('UsersService', () => {
  let usersService: UsersService;
  let mockCtx: MockContext;
  let ctx: Context;

  beforeEach(async () => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: ctx.prisma,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  it('should be get user by id', async () => {
    // @ts-ignore
    await mockCtx.prisma.user.findFirst.mockResolvedValueOnce(usersStub[0]);
    const user = await usersService.getUserById(usersStub[0].id);
    await expect(user).toEqual(usersStub[0]);
  });

  it('should be create user', async () => {
    await mockCtx.prisma.user.create.mockResolvedValueOnce(usersStub[0]);
    const createUserDto: CreateUserDto = {
      id: usersStub[0].id,
      email: usersStub[0].email,
      username: usersStub[0].username,
      fullName: usersStub[0].fullName,
    };
    const user = await usersService.create(createUserDto);
    await expect(user).toEqual(usersStub[0]);
  });
});
