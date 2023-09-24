import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(TaskRepository)
		private tasksRepository: TaskRepository,
	) {}

	getTask(filterDto: GetTasksFilterDto): Promise<Task[]> {
		
	}

	createTask(createTaskDto: CreateTaskDto): Promise<Task> {
		return this.tasksRepository.createTask(createTaskDto);
	}
	async getById(id: string): Promise<Task> {
		const tasks = await this.tasksRepository.findOne({
			where: {
				id,
			},
		});
		if (!tasks) {
			throw new NotFoundException(`Task with ID: ${id} not found`);
		}
		return tasks;
	}

	async deletTask(id: string): Promise<void> {
		const result = await this.tasksRepository.delete(id);
		if (result.affected === 0) {
			throw new NotFoundException(`Task with ${id} not found`);
		}
	}

	async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
		const task = await this.getById(id);
		task.status = status;
		await this.tasksRepository.save(task);
		return task;
	}
}
