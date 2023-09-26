import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
const mockTasksRepository = () => ({
	getTask: jest.fn(),
});

const mockUser = {
	username: 'Alex',
	id: 'someId',
	password: 'somePassword',
	tasks: [],
};

describe('TaskService', () => {
	let tasksService: TasksService;
	let tasksRepository;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				TasksService,
				{ provide: TaskRepository, useFactory: mockTasksRepository },
			],
		}).compile();
		tasksService = module.get(TasksService);
		tasksRepository = module.get(TaskRepository);
	});

	describe('getTask', () => {
		it('calls TaskRepository.getTask and returns the result', async () => {
			tasksRepository.getTask.mockResolvedValue('someValue');
			const result = await tasksService.getTask(null, mockUser);
			expect(result).toEqual('someValue');
		});
	});
});
