import { Controller, Get, Render } from '@nestjs/common';
import { TodoService } from './todo/todo.service';

@Controller()
export class AppController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @Render('index')
  async homePage() {
    const todos = await this.todoService.findAll();
    return { todos }; // Truyền dữ liệu vào view
  }
}
