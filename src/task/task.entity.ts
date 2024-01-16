import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from '~/board/board.entity';
import { User } from '~/user/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  status: string;

  @Column()
  priority: number;

  @CreateDateColumn()
  dueDate?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @CreateDateColumn({ nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'userId' })
  assignee?: User;

  @Column({ nullable: true })
  assigneeName?: string;

  @ManyToOne(() => Board, (board) => board.tasks)
  @JoinColumn({ name: 'boardId' })
  board: Board;

  @Column({ nullable: true })
  projectId?: number;

  @Column({ nullable: true })
  categoryId?: number;

  @Column()
  order: number;

  @Column({ nullable: true })
  estimatedTime?: number;

  @Column({ nullable: true })
  actualTime?: number;

  @Column({ nullable: true })
  parentTaskId?: number;

  @Column({ nullable: true })
  attachmentPath?: string;

  @Column({ default: false })
  deleted: boolean;
}
