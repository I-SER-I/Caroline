import { ApiProperty } from '@nestjs/swagger';

export class EdgeDto {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    nullable: true,
    default: null,
    description: 'null if the edge is not a child',
  })
  from: string;
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    nullable: true,
    default: null,
    description: 'null if the edge is not a child',
  })
  to: string;
}
