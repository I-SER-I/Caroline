import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import JiraClient from 'jira-connector';

@Injectable()
export class JiraApi {
  constructor(private readonly prismaService: PrismaService) {}

  public async createJira(userId: string): Promise<JiraClient> {
    const credentials = await this.prismaService.credential.findFirst({
      where: {
        userId: userId,
        apiService: 'jira',
      },
    });
    return new JiraClient({
      host: credentials.config['host'],
      basic_auth: {
        email: credentials.config['email'],
        api_token: credentials.config['apiToken'],
      },
    });
  }
}
