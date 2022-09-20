import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  superTokenId: string;

  @Column()
  name: string;

  @Column()
  email: string;
}
