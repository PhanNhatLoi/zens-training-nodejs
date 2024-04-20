import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from '../todo.service';
import { Todo } from './interfaces/todo.interface';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('TodoController', () => {
  let controller: TodoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();

    controller = module.get<TodoController>(TodoController);
  });

  describe('todo-test', () => {
    //_____test add work_____//
    it('add work success', async () => {
      const result = {
        name: 'first work',
        description: 'description',
      };

      expect((await controller.create(result)).message).toEqual(
        'add work success!',
      );
    });

    it('add work success data description is empty', async () => {
      const result = {
        name: 'first work',
        description: '',
      };

      expect((await controller.create(result)).message).toEqual(
        'add work success!',
      );
    });

    it('add work name is ""', async () => {
      const result = {
        name: '',
        description: 'description',
      };
      expect(() => controller.create(result)).rejects.toThrow(
        new BadRequestException('Name is required!'),
      );
    });

    it('add work name is " "', async () => {
      const result = {
        name: ' ',
        description: 'description',
      };
      expect(() => controller.create(result)).rejects.toThrow(
        new BadRequestException('Name is required!'),
      );
    });

    it('add work name is null', async () => {
      const result = {
        name: null,
        description: 'description',
      };
      expect(() => controller.create(result)).rejects.toThrow(
        new BadRequestException('Name is required!'),
      );
    });
    //_____test add work_____//

    //_____test getList work_____//

    it('should return list work', async () => {
      const newTodo = {
        name: 'first work',
        description: 'description',
      };
      const res = await controller.create(newTodo);
      expect(await controller.getList()).toEqual([res.work]);
    });

    it('should return list work not work with status : "DELETE"', async () => {
      // mock data test
      const result: Todo[] = [
        {
          name: 'first work',
          description: 'description',
        },
        {
          name: 'second deleted',
          description: 'description',
        },
      ];

      const resCreateFirstWork = await controller.create(result[0]);
      const resCreateSecondWork = await controller.create(result[1]);

      await controller.delete({ id: resCreateFirstWork.work._id });
      const expectResult: Todo[] = [resCreateSecondWork.work];
      expect(await controller.getList()).toEqual(expectResult);
    });

    //_____test getList work_____//

    //_____test getDetail work_____//

    it('should return work detail', async () => {
      const newTodo = {
        name: 'first work',
        description: 'description',
      };
      const res = await controller.create(newTodo);
      expect(await controller.getDetail({ id: res.work._id })).toEqual(
        res.work,
      );
    });

    it('get work with wrong id', async () => {
      expect(() => controller.getDetail({ id: 'wrong id' })).toThrow(
        NotFoundException,
      );
    });

    it('get work is deleted', async () => {
      const newTodo = {
        name: 'first work',
        description: 'description',
      };
      const res = await controller.create(newTodo);
      await controller.delete({ id: res.work._id });
      expect(() => controller.getDetail({ id: res.work._id })).toThrow(
        NotFoundException,
      );
    });

    //_____test getDetail work_____//

    //_____test delete work_____//

    it('should delete work', async () => {
      const newTodo = {
        name: 'first work',
        description: 'description',
      };
      const res = await controller.create(newTodo);
      expect(controller.delete({ id: res.work._id })).toEqual({
        message: 'delete work success',
      });
    });

    it('should delete work error with wrong id', async () => {
      expect(() => controller.delete({ id: 'wrong id' })).toThrow(
        NotFoundException,
      );
    });

    it('should error delete work is deleted ', async () => {
      const newTodo = {
        name: 'first work',
        description: 'description',
      };
      const res = await controller.create(newTodo);
      await controller.delete({ id: res.work._id });

      expect(() => controller.delete({ id: res.work._id })).toThrow(
        NotFoundException,
      );
    });
    //_____test delete work_____//

    //_____test update work_____//

    it('should update work done', async () => {
      const newTodo = {
        name: 'first work',
        description: 'description',
      };
      const res = await controller.create(newTodo);
      expect(controller.update({ id: res.work._id }, res.work).message).toEqual(
        'Update work success',
      );
    });

    it('should error update work with wrong id', async () => {
      const newTodo = {
        name: 'first work',
        description: 'description',
      };
      const res = await controller.create(newTodo);
      expect(() => controller.update({ id: 'wrong id' }, res.work)).toThrow(
        NotFoundException,
      );
    });

    it('should error update body empty', async () => {
      const newTodo = {
        name: 'first work',
        description: 'description',
      };
      const res = await controller.create(newTodo);
      expect(() =>
        controller.update({ id: res.work._id }, { name: '', description: '' }),
      ).toThrow(BadRequestException);
    });
    //_____test update work_____//
    //_____test update status_____//
    it('update status success', async () => {
      const newTodo = {
        name: 'first work',
        description: 'description',
      };
      const res = await controller.create(newTodo);
      expect(
        controller.changeStatus({ id: res.work._id, status: 'IN_PROGRESS' })
          .message,
      ).toEqual('Update state work success');
    });

    it('update status success', async () => {
      const newTodo = {
        name: 'first work',
        description: 'description',
      };
      const res = await controller.create(newTodo);
      expect(
        controller.changeStatus({ id: res.work._id, status: 'IN_PROGRESS' })
          .message,
      ).toEqual('Update state work success');
    });

    it('update status with status wrong', async () => {
      const newTodo = {
        name: 'first work',
        description: 'description',
      };
      const res = await controller.create(newTodo);

      expect(() =>
        controller.changeStatus({ id: res.work._id, status: 'DELETE' }),
      ).toThrow(BadRequestException);
    });
    //_____test update status_____//
  });
});
