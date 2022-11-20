import { ApiProperty } from '@nestjs/swagger';

export class TrelloProjectDto {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  boardId: string;

  @ApiProperty()
  serviceName = 'trello';
}
