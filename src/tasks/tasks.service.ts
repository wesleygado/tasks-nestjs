import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status-enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { GetTasksFilterDto } from './dto/get-taks-dto';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepostory: TasksRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepostory.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepostory.findOne(id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found!`);
    }

    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepostory.createTask(createTaskDto);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepostory.delete(id);
    console.log(result);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found!`);
    }
  }

  async updateTaskStatus(
    id: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    const task = await this.getTaskById(id);
    await this.tasksRepostory.save(updateTaskStatusDto);
    return task;
  }
}
