import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { GetTasksFilterDTO } from 'src/dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './task.status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    // private tasks: Task[] = [];

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}

    getTasks(
        filterDto: GetTasksFilterDTO,
        user: User
    ): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto, user);
    }

    async getTaskById(id: number, user: User) {
        // const found = await this.taskRepository.findOne(id);
        const found = await this.taskRepository.findOne({ where: { id, user: user.id }});
        if (!found) {
            throw new NotFoundException(`Task with Id "${id}" not found.`);
        }

        return found;
    }

    // Entity만 사용하여 create task 할 경우
    async createTask(
        createTaskDto: CreateTaskDto,
        user: User
    ) {
        return this.taskRepository.createTask(createTaskDto, user);
    }

    async deleteTaskById(id: number, user: User): Promise<void> {
        // const index = this.tasks.findIndex(task => task.id === id);
        // return this.tasks.splice(index, 1);
        // const found = await this.taskRepository.findOne(id);
        // if (!found) {
        //     throw new NotFoundException(`Task with Id "${id}" not found.`);
        // }
        const result = await this.taskRepository.delete({id, user: user});
        if (result.affected === 0) {
            throw new NotFoundException(`Task ID ${id} is not existed.`);
        }
    }

    async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
        const task = await this.getTaskById(id, user);
        task.status = status;
        await task.save();
        return task;
    }

    // getTasksWithFilter(filterDTO: GetTasksFilterDTO) {
    //     const { status, search } = filterDTO;
    //     let tasks = this.getAllTasks();
        
    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status);
    //     }

    //     if (search) {
    //         tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
    //     }

    //     return tasks;
    // }

}
