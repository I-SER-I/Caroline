import { TrelloService } from '../abstractions/trello.interface';
import { PrismaService } from '../prisma/prisma.service';
import { CredentialsDto } from './dto/credentials.dto';
import { TrelloCredential } from '@prisma/client';

export class CredentialsService extends TrelloService {
  constructor(protected readonly prismaService: PrismaService) {
    super(prismaService);
  }

  async addCredentials(
    createCredentialsDto: CredentialsDto,
  ): Promise<TrelloCredential> {
    return await this.prismaService.trelloCredential.create({
      data: createCredentialsDto,
    });
  }
}
