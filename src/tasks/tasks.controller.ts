import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { GetTasksFilterDTO } from 'src/dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './task.status.enum';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {

    constructor(
        private tasksService: TasksService
    ) {}

    @Get()
    getTasks(
        @Query() filterDto: GetTasksFilterDTO,
        @GetUser() user: User
    ): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto, user);
    }

    @Get('/:id')
    getTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ) : Promise<Task> {
        console.log('[getTaskById]', user);
        return this.tasksService.getTaskById(id, user);
    }

    @Post()
    createTask(
        // @Body('title') title,
        // @Body('description') description
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User
    ): Promise<Task> {
        console.log('[createTask user]', user);
        // task를 생성할 때, 어떤 User가 생성했는지 알 수 있도록 user를 받는다
        return this.tasksService.createTask(createTaskDto, user);
    }

    // @Post()
    // createTask(
    //     // @Body('title') title,
    //     // @Body('description') description
    //     @Body() createTaskDto: CreateTaskDto
    // ): Task {
    //     return this.tasksService.createTask(createTaskDto);
    // }

    @Delete('/:id')
    deleteTask(
        @Param('id') id: number,
        @GetUser() user: User
    ): Promise<void> {
        return this.tasksService.deleteTaskById(id, user);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status') status: TaskStatus,
        @GetUser() user: User
    ): Promise<Task> {
        console.log('[updateTaskStatus]', id, status);
        const task = this.tasksService.updateTaskStatus(id, status, user);
        return task;
    }
}
