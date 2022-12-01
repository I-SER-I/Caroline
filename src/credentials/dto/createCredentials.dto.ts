import { ApiProperty } from '@nestjs/swagger';

export class CreateCredentialsDto {
  @ApiProperty()
  apiKey: string;

  @ApiProperty()
  oAuthToken: string;
}
