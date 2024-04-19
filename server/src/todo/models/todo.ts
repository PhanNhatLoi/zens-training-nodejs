import { ObjectType, Field, InterfaceType } from '@nestjs/graphql';
import { StatusType } from '../dto/create-todo.dto';

@InterfaceType()
export abstract class Work {
  @Field()
  _id?: string;
  @Field()
  name: string;
  @Field()
  description: string;
  @Field()
  status?: StatusType;
}

@ObjectType({
  implements: () => [Work],
})
export class Todo implements Work {
  _id?: string;
  name: string;
  description: string;
  status?: StatusType;
}
