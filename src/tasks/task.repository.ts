import { User } from "src/auth/user.entity";
import { CreateTaskDto } from "src/dto/create-task.dto";
import { GetTasksFilterDTO } from "src/dto/get-tasks-filter.dto";
import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";
import { TaskStatus } from "./task.status.enum";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async getTasks(
        filterDto: GetTasksFilterDTO,
        user: User,
    ): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task'); // 'task'는 query 안에서 쓸 키워드이고 task entity를 참조한다.
        
        query.where('task.userId = :userId', { userId: user.id });
        if (status) {
            // query.andWhere('task.status = :status', { status: 'OPEN' });
            query.andWhere('task.status = :status', { status });
        }
    
        if (search) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` } );
        }

        const tasks = await query.getMany();
        return tasks;
    }

    async createTask(
        createTaskDto: CreateTaskDto,
        user: User
    ): Promise<Task> {
        const { title, description } = createTaskDto;
        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;
        task.user = user;
        await task.save();

        delete task.user;
        return task;
    }

}