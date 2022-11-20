import { ApiProperty } from '@nestjs/swagger';

export class MemberDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  imageUrl: string;
}
