import { ApiProperty } from '@nestjs/swagger';

export class TagDto {
  @ApiProperty({
    description: 'The id of the tag',
    example: '5ad70d5c841642c2a88da63c',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the tag',
    example: 'ITMO.Olymp',
  })
  name: string;

  @ApiProperty({
    description: 'The color of the tag',
    example: 'blue',
  })
  color: string;
}
