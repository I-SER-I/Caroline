import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaService } from '../prisma.service';

export type Context = {
  prisma: PrismaService;
};

export type MockContext = {
  prisma: DeepMockProxy<PrismaService>;
};

export const createMockContext = (): MockContext => {
  return {
    prisma: mockDeep<PrismaService>(),
  };
};
