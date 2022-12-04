import { ApiProperty } from '@nestjs/swagger';

export class StateDto {
  @ApiProperty({
    description: 'The id of the state',
    example: '5ad70d5c841642c2a88da63c',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the state',
    example: 'In progress',
  })
  name: string;
}
