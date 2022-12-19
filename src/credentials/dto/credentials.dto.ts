import { ApiProperty } from '@nestjs/swagger';
import { ProjectManagementSystemTypeEnum } from '../../strategies/projectManagementSystemType.enum';
import { Prisma } from '@prisma/client';

export class CredentialsDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  config: Prisma.JsonValue;

  @ApiProperty({
    enum: ProjectManagementSystemTypeEnum,
  })
  apiService: string;
}
