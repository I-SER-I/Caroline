import { PrismaService } from '../prisma/prisma.service';
import { CredentialsDto } from './dto/credentials.dto';
import { Credential } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { ProjectManagementSystemTypeEnum } from '../strategies/projectManagementSystemType.enum';

@Injectable()
export class CredentialsService {
  constructor(private readonly prismaService: PrismaService) {}

  async addCredentials(
    createCredentialsDto: CredentialsDto,
  ): Promise<Credential> {
    return await this.prismaService.credential.create({
      data: createCredentialsDto,
    });
  }

  async updateCredentials(credentialsDto: CredentialsDto): Promise<Credential> {
    const credential = await this.prismaService.credential.findFirst({
      where: {
        userId: credentialsDto.userId,
      },
    });

    return await this.prismaService.credential.update({
      where: {
        id: credential.id,
      },
      data: credentialsDto,
    });
  }

  async deleteCredentials(
    userId: string,
    apiService: ProjectManagementSystemTypeEnum,
  ) {
    const credential = await this.prismaService.credential.findFirst({
      where: {
        userId: userId,
        apiService: apiService,
      },
    });

    return await this.prismaService.credential.delete({
      where: {
        id: credential.id,
      },
    });
  }
}
