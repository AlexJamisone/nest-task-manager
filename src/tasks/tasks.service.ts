import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
	private task: Task[] = [];

	public getAllTasks(): Task[] {
		return this.task;
	}

	public getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
		const { search, status } = filterDto;

		let tasks = this.getAllTasks();

		if (status) {
			tasks = tasks.filter((task) => task.status === status);
		}

		if (search) {
			tasks = tasks.filter((task) => {
				if (
					task.title.toLowerCase().includes(search.toLowerCase()) ||
					task.description
						.toLowerCase()
						.includes(search.toLowerCase())
				) {
					return true;
				}
				return false;
			});
		}

		return tasks;
	}
	public createTask(createTaskDto: CreateTaskDto): Task {
		const { description, title } = createTaskDto;
		const task: Task = {
			id: uuidv4(),
			description,
			title,
			status: TaskStatus.OPEN,
		};
		this.task.push(task);

		return task;
	}

	public getTaskById(id: string): Task {
		const found = this.task.find((task) => task.id === id);
		if (!found) {
			throw new NotFoundException(`Task of "${id}" not found`);
		}
		return found;
	}
	public deletTask(id: string): void {
		const found = this.getTaskById(id);
		this.task = this.task.filter((task) => task.id !== found.id);
	}
	public update(updateStatus: UpdateTaskDto, id: string): Task {
		const { description, title, status } = updateStatus;
		const task = this.getTaskById(id);
		task.description = description;
		task.title = title;
		task.status = status;
		return task;
	}
	public updateStatus(id: string, status: TaskStatus): Task {
		const task = this.getTaskById(id);
		task.status = status;
		return task;
	}
}
