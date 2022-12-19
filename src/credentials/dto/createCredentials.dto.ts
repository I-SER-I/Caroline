import { ApiProperty } from '@nestjs/swagger';

export class CreateCredentialsDto {
  @ApiProperty()
  config: string;
}
