import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(TaskRepository)
		private tasksRepository: TaskRepository,
	) {}
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
}
