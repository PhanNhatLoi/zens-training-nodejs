import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TodoController } from './todo/controllers/todo.controller';
import { TodoService } from './todo/todo.service';

@Module({
  imports: [
    // public folder
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveRoot: '/public',
    }),
    TodoModule,
  ],
  controllers: [AppController, TodoController],
  providers: [AppService, TodoService],
})
export class AppModule {}
