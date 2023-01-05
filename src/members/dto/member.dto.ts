import { ApiProperty } from '@nestjs/swagger';

export class MemberDto {
  @ApiProperty({
    example: '61f83e93caafc8619cec994b',
    description: 'The id of the member',
  })
  id: string;

  @ApiProperty({
    example: 'I_CAROLINA_I',
    description: 'The name of the member',
  })
  name: string;

  @ApiProperty({
    example: 'https://trello-avatars.s3.amazonaws.com/61f83e93caafc8619cec994b',
    description: 'The avatar url of the member',
  })
  imageUrl: string;
}
