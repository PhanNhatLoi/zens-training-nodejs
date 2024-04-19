import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './models/todo';
import { StatusType } from './dto/create-todo.dto';

@Resolver('todo')
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Query(() => [Todo])
  async TodoList(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Query(() => Todo)
  async getDetail(
    @Args('_id', { type: () => String }) _id: string,
  ): Promise<Todo> {
    return this.todoService.detail(_id);
  }

  @Mutation(() => String)
  async createTodo(
    @Args('name', { type: () => String }) name: string,
    @Args('description', { type: () => String, nullable: true })
    description?: string,
  ): Promise<string> {
    const res = await this.todoService.create({
      name,
      description: description,
    });
    return res.message;
  }

  @Mutation(() => String)
  async updateTodo(
    @Args('name', { type: () => String }) name: string,
    @Args('description', { type: () => String, nullable: true })
    description?: string,
    @Args('_id', { type: () => String, nullable: true })
    _id?: string,
  ): Promise<string> {
    const res = await this.todoService.update({
      _id,
      name,
      description,
    });
    return res.message;
  }

  @Mutation(() => String)
  async changeStatus(
    @Args('_id', { type: () => String, nullable: true }) _id: string,
    @Args('status', { type: () => String }) status: StatusType,
  ): Promise<string> {
    const res = await this.todoService.changeStatus(_id, status);
    return res.message;
  }

  @Mutation(() => String)
  async delete(
    @Args('_id', { type: () => String, nullable: true }) _id: string,
  ): Promise<string> {
    const res = await this.todoService.delete(_id);
    return res.message;
  }
}
