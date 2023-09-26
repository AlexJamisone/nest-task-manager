import {
	Patch,
	Delete,
	Controller,
	Get,
	Param,
	Post,
	Body,
	Query,
	UseGuards,
	Logger,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
	private logger = new Logger('TasksController');
	constructor(private tasksService: TasksService) {}
	@Get()
	getTasks(
		@Query() filterDto: GetTasksFilterDto,
		@GetUser() user: User,
	): Promise<Task[]> {
		this.logger.verbose(
			`User "${
				user.username
			}" retriving all tasks. Filters: ${JSON.stringify(filterDto)}`,
		);
		return this.tasksService.getTask(filterDto, user);
	}

	@Get('/:id')
	getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
		return this.tasksService.getById(id, user);
	}
	@Post()
	createTask(
		@Body() createTaskDto: CreateTaskDto,
		@GetUser() user: User,
	): Promise<Task> {
		this.logger.verbose(
			`User "${user.username}" creating new Task. Data: ${JSON.stringify(
				createTaskDto,
			)}`,
		);
		return this.tasksService.createTask(createTaskDto, user);
	}
	// @Post('/:id/')
	// update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
	// 	return this.tasksService.update(updateTaskDto, id);
	// }
	@Patch('/:id/status')
	updateStatus(
		@Param('id') id: string,
		@Body() updateTaskStatus: UpdateTaskStatusDto,
		@GetUser() user: User,
	): Promise<Task> {
		const { status } = updateTaskStatus;
		return this.tasksService.updateTaskStatus(id, status, user);
	}

	@Delete('/:id')
	deletTask(@Param('id') id: string, @GetUser() user: User): void {
		this.tasksService.deletTask(id, user);
	}
}
