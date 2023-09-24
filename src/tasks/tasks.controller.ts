import {
	Patch,
	Delete,
	Controller,
	Get,
	Param,
	Post,
	Body,
	Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
	constructor(private tasksService: TasksService) {}
	@Get()
	getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
		return this.tasksService.getTask(filterDto);
	}

	@Get('/:id')
	getTaskById(@Param('id') id: string): Promise<Task> {
		return this.tasksService.getById(id);
	}
	@Post()
	createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
		return this.tasksService.createTask(createTaskDto);
	}
	// @Post('/:id/')
	// update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
	// 	return this.tasksService.update(updateTaskDto, id);
	// }
	@Patch('/:id/status')
	updateStatus(
		@Param('id') id: string,
		@Body() updateTaskStatus: UpdateTaskStatusDto,
	): Promise<Task> {
		const { status } = updateTaskStatus;
		return this.tasksService.updateTaskStatus(id, status);
	}

	@Delete('/:id')
	deletTask(@Param('id') id: string): void {
		this.tasksService.deletTask(id);
	}
}
