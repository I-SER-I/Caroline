import { ApiProperty } from '@nestjs/swagger';

export class CredentialsDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  apiKey: string;

  @ApiProperty()
  oAuthToken: string;
}
