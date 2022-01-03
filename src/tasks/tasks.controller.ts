import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Patch,
  Query,
  Render,
  Res,
  Redirect,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status-enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-taks-dto';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  @Render('index')
  root(@Query() filterDto: GetTasksFilterDto) {
    return this.tasksService
      .getTasks(filterDto)
      .then((result) => (result ? { tasks: result } : { tasks: [] }));
  }

  @Get('create')
  @Render('create')
  create(): void {
    //
  }

  @Get('/:id/edit')
  @Render('edit')
  getTaskByIdEdit(@Param('id') id: string) {
    return this.tasksService
      .getTaskById(id)
      .then((result) => ({ task: result }));
  }

  @Get('/:id')
  @Render('show')
  getTaskById(@Param('id') id: string) {
    return this.tasksService
      .getTaskById(id)
      .then((result) => ({ task: result }));
  }

  @Post()
  @Redirect('/tasks')
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  @Redirect('/tasks')
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id')
  @Redirect('/tasks')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, updateTaskStatusDto);
  }
}
