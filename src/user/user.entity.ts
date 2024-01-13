import * as crypto from 'node:crypto';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Board } from '~/board/board.entity';
import { Task } from '~/task/task.entity';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 1 })
  permission: number;

  @OneToMany(() => Task, (task) => task.assignee)
  tasks: Task[];

  @ManyToMany(() => Board)
  @JoinTable()
  boards: Board[];

  @Column({ default: crypto.randomBytes(64).toString('hex') })
  token: string;
}
