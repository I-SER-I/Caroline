import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  readonly superTokenId: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly name: string;
}
