import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  findOne(where: FindOptionsWhere<Task>): Promise<Task> {
    return this.tasksRepository.findOneBy(where);
  }

  async remove(id: string): Promise<void> {
    await this.tasksRepository.delete(id);
  }

  async create(task: Task): Promise<Task> {
    return await this.tasksRepository.save(task);
  }

  async update(id: string, task: Task): Promise<void> {
    await this.tasksRepository.update(id, task);
  }
}
