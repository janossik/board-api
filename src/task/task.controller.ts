import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Roles } from '~/roles/roles.decorator';
import { ParsedUtil } from '~/utils/parsed.util';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Roles(['quest'])
  @Get()
  getAllTasks() {
    return this.taskService.findAll();
  }

  @Roles(['quest'])
  @Get(':id')
  getTask(@Param('id') id: string) {
    return this.taskService.findOne({ id: ParsedUtil.parseID(id) });
  }

  @Roles(['developer'])
  @Post()
  createTask(@Body() task: Task) {
    return this.taskService.create(task);
  }

  @Roles(['leader'])
  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.update(id, { deleted: true });
  }

  @Roles(['developer'])
  @Put(':id')
  updateTask(@Param('id') id: string, @Body() task: Task) {
    return this.taskService.update(id, task);
  }
}
