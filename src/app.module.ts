import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'node:path';
import { AppController } from '~/app.controller';
import { AppService } from '~/app.service';
import { AuthModule } from '~/auth/auth.module';
import { BoardController } from '~/board/board.controller';
import { Board } from '~/board/board.entity';
import { BoardService } from '~/board/board.service';
import { TaskController } from '~/task/task.controller';
import { Task } from '~/task/task.entity';
import { TaskService } from '~/task/task.service';
import { UserModule } from '~/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'kanban',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true, // only development
    }),
    TypeOrmModule.forFeature([Board]),
    TypeOrmModule.forFeature([Task]),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController, TaskController, BoardController],
  providers: [AppService, BoardService, TaskService],
})
export class AppModule {}
