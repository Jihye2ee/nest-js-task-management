import { TaskStatus } from "src/tasks/task.status.enum";


export class GetTasksFilterDTO {
    status: TaskStatus;
    search: string;
}