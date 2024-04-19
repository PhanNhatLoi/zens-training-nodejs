import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Todo } from './controllers/interfaces/todo.interface';

@Injectable()
export class TodoService {
  private readonly todoWorks: Todo[] = [];

  create(work: Todo) {
    if (!work.name?.trim()) {
      throw new BadRequestException('Name is required!');
    }
    const newWork: Todo = {
      _id: new Date(Date.now()).getTime().toString(),
      name: work.name,
      description: work.description || '',
      status: 'NEW',
    };
    this.todoWorks.push(newWork);
    return {
      message: 'add work success!',
      work: newWork,
    };
  }

  findAll(): Todo[] {
    return this.todoWorks.filter((f) => f.status !== 'DELETE');
  }

  detail(_id: string): Todo {
    const indexResult = this.todoWorks.findIndex(
      (f) => f._id === _id && f.status !== 'DELETE',
    );
    if (indexResult < 0) {
      throw new NotFoundException('work not round');
    }
    return this.todoWorks[indexResult];
  }

  update(body: Todo) {
    if (!body._id) {
      throw new BadRequestException('id is required!');
    }
    const index = this.todoWorks.findIndex((f) => f._id === body._id);
    if (index < 0) {
      throw new NotFoundException('work not round');
    }
    if (!body.name && !body.description) {
      throw new BadRequestException('name and description is null!');
    }
    const UpdateBody: Todo = {
      ...this.todoWorks[index],
      name: body.name?.trim() || this.todoWorks[index].name,
      description:
        body.description?.trim() || this.todoWorks[index].description,
    };
    this.todoWorks[index] = UpdateBody;
    return {
      message: 'Update work success',
    };
  }
  changeStatus(_id, status) {
    const statusValidate = ['NEW', 'IN_PROGRESS', 'DONE'];
    if (!_id) {
      throw new BadRequestException('id is required!');
    }
    const index = this.todoWorks.findIndex(
      (f) => f._id === _id && f.status !== 'DELETE',
    );
    if (index < 0) {
      throw new NotFoundException('work not round');
    }
    if (!statusValidate.includes(status)) {
      throw new BadRequestException('status is invalid!');
    }
    this.todoWorks[index].status = status;
    return {
      message: 'Update state work success',
    };
  }

  delete(_id: string) {
    if (!_id) {
      throw new BadRequestException('id is required!');
    }
    const index = this.todoWorks.findIndex(
      (f) => f._id === _id && f.status !== 'DELETE',
    );
    if (index < 0) {
      throw new NotFoundException('work not round');
    }
    this.todoWorks[index].status = 'DELETE';
    return {
      message: 'delete work success',
    };
  }
}
