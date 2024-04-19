import { StatusType } from '../dto/create-todo.dto';

export interface Todo {
  _id?: string;
  name: string;
  description: string;
  status?: StatusType;
}
