import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(TaskRepository)
		private tasksRepository: TaskRepository,
	) {}

	getTask(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
		return this.tasksRepository.getTask(filterDto, user);
	}

	createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
		return this.tasksRepository.createTask(createTaskDto, user);
	}
	async getById(id: string, user: User): Promise<Task> {
		const tasks = await this.tasksRepository.findOne({
			where: {
				id,
				user,
			},
		});
		if (!tasks) {
			throw new NotFoundException(`Task with ID: ${id} not found`);
		}
		return tasks;
	}

	async deletTask(id: string, user: User): Promise<void> {
		const result = await this.tasksRepository.delete({ id, user });
		if (result.affected === 0) {
			throw new NotFoundException(`Task with ${id} not found`);
		}
	}

	async updateTaskStatus(
		id: string,
		status: TaskStatus,
		user: User,
	): Promise<Task> {
		const task = await this.getById(id, user);
		task.status = status;
		await this.tasksRepository.save(task);
		return task;
	}
}
