import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { TodoService } from '../todo.service';
import { CreateTodoDto, StatusType } from './dto/create-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private todoWorksService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoWorksService.create(createTodoDto);
  }

  @Get()
  async getList(): Promise<Todo[]> {
    return this.todoWorksService.findAll();
  }

  @Get(':id')
  getDetail(@Param() { id }: { id: string }) {
    return this.todoWorksService.detail(id);
  }

  @Put(':id')
  update(@Param() { id }: { id: string }, @Body() body: CreateTodoDto) {
    return this.todoWorksService.update({ ...body, _id: id });
  }

  @Put(':id/:status')
  changeStatus(@Param() { id, status }: { id: string; status: StatusType }) {
    return this.todoWorksService.changeStatus(id, status.toUpperCase());
  }

  @Delete(':id')
  delete(@Param() { id }: { id: string }) {
    return this.todoWorksService.delete(id);
  }
}
