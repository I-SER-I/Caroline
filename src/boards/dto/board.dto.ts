import { ApiProperty } from '@nestjs/swagger';

export class BoardDto {
  @ApiProperty({
    example: '98127',
    description: 'Caroline board id',
  })
  id: number;

  @ApiProperty({
    example: '6f22c943-d50c-4513-9fcf-37a1a053e595',
    description: 'Caroline user id',
  })
  userId: string;

  @ApiProperty({
    example: '521a30bd-0af1-4f62-a467-e3cf34d46755',
    description: 'PMS board id',
  })
  boardId: string;

  @ApiProperty({ example: 'MyBoard', description: 'PMS board name' })
  title: string;

  @ApiProperty({
    example: 'https://trello.com/b/123456/name',
    description: 'PMS board url',
  })
  url: string;

  @ApiProperty({ example: 'trello', description: 'PMS type' })
  serviceName: string;
}
