import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '~/auth/auth.guard';
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
  @UseGuards(AuthGuard)
  @Post()
  createTask(@Body() task: Task) {
    return this.taskService.create(task);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  updateTask(@Param('id') id: string, @Body() task: Task) {
    return this.taskService.update(id, task);
  }
}
