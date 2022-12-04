import { ApiProperty } from '@nestjs/swagger';
import { ProjectManagementSystemTypeEnum } from '../../strategies/projectManagementSystemType.enum';

export class CredentialsDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  apiKey: string;

  @ApiProperty()
  oAuthToken: string;

  @ApiProperty({
    enum: ProjectManagementSystemTypeEnum,
  })
  apiService: string;
}
