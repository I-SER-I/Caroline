import { ApiProperty } from '@nestjs/swagger';

export class ProjectDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  boardId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  serviceName: string;
}
