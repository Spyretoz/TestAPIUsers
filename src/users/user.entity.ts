import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column({ select: false })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @UpdateDateColumn()
  updateAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
