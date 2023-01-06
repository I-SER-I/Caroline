import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: '050b2e99-bc8c-4c92-a650-756e8befec7d',
    description: 'SuperTokens user id',
  })
  readonly id: string;

  @ApiProperty({ example: 'carolina@itmo.tu', description: 'User email' })
  readonly email: string;

  @ApiProperty({ example: 'I_CAROLINA_I', description: 'User unique name' })
  readonly username: string;
}
