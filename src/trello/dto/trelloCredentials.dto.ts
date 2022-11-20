import { ApiProperty } from '@nestjs/swagger';

export class TrelloCredentialDto {
  @ApiProperty()
  apiKey: string;

  @ApiProperty()
  oAuthToken: string;
}
