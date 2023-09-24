import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
	constructor(private tasksService: TasksService) {}
	// @Get()
	// getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
	// 	if (Object.keys(filterDto).length) {
	// 		return this.tasksService.getTasksWithFilters(filterDto);
	// 	} else {
	// 		return this.tasksService.getAllTasks();
	// 	}
	// }

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
	// @Patch('/:id/status')
	// updateStatus(
	// 	@Param('id') id: string,
	// 	@Body() updateTaskStatus: UpdateTaskStatusDto,
	// ): Task {
	// 	const { status } = updateTaskStatus;
	// 	return this.tasksService.updateStatus(id, status);
	// }

	// @Delete('/:id')
	// deletTask(@Param('id') id: string): void {
	// 	this.tasksService.deletTask(id);
	// }
}
