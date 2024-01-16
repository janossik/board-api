import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ParsedUtil } from '~/utils/parsed.util';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getAllTasks() {
    return this.taskService.findAll();
  }

  @Get(':id')
  getTask(@Param('id') id: string) {
    return this.taskService.findOne({ id: ParsedUtil.parseID(id) });
  }
  @Post()
  createTask(@Body() task: Task) {
    return this.taskService.create(task);
  }
  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
  @Put(':id')
  updateTask(@Param('id') id: string, @Body() task: Task) {
    return this.taskService.update(id, task);
  }
}
