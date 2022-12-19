import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { CredentialsService } from '../credentials.service';
import {
  Context,
  createMockContext,
  MockContext,
} from '../../prisma/tests/prisma.service.mock';
import { credentialsStub } from './credentials.stub';
import { ProjectManagementSystemTypeEnum } from '../../strategies/projectManagementSystemType.enum';

describe('CredentialsService', () => {
  let credentialsService: CredentialsService;
  let mockCtx: MockContext;
  let ctx: Context;

  beforeEach(async () => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CredentialsService,
        {
          provide: PrismaService,
          useValue: ctx.prisma,
        },
      ],
    }).compile();

    credentialsService = module.get<CredentialsService>(CredentialsService);
  });

  it('should be defined', () => {
    expect(credentialsService).toBeDefined();
  });

  it('should be add credentials', async () => {
    const createCredentialDto = {
      userId: credentialsStub[0].userId,
      config: credentialsStub[0].config,
      apiService: credentialsStub[0].apiService,
    };

    // @ts-ignore
    await mockCtx.prisma.credential.create.mockResolvedValueOnce(
      credentialsStub[0],
    );

    // @ts-ignore
    const credential = await credentialsService.addCredentials(
      createCredentialDto,
    );

    await expect(credential).toEqual(credentialsStub[0]);
  });

  it('should be check if credential exist', async () => {
    await mockCtx.prisma.credential.findFirst.mockResolvedValueOnce(
      credentialsStub[0],
    );

    const isCredentialExist: boolean =
      await credentialsService.credentialsExist(
        credentialsStub[0].userId,
        ProjectManagementSystemTypeEnum[credentialsStub[0].apiService],
      );

    await expect(isCredentialExist).toBeTruthy();
  });
});
