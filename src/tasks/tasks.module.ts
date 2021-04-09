import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
    imports: [],
    providers: [TasksService],
    exports: [],
    controllers: [TasksController]
})
export class TasksModule {}
