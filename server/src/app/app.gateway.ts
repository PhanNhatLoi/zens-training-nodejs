import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { StatusType } from 'src/todo/dto/create-todo.dto';
import { Todo } from '../todo/models/todo';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  // Tại đây sử dụng chung tên sự kiện tại client và server để dễ hiểu
  @SubscribeMessage('add-todo')
  async handleAddTodo(_: Socket, payload: Todo): Promise<void> {
    // arg thứ nhất là client, có vai trò lấy các thông tin từ client
    // Có thể dựa vào client.id để gửi emit tới chính xác client cần nhận tin nhắn, ứng dụng cho các tin nhắn cần gửi cho đối tượng nào đó.
    this.server.emit('add-todo', payload);
  }

  @SubscribeMessage('delete-todo')
  async handleDeleteTodo(_: Socket, payload: string): Promise<void> {
    this.server.emit('delete-todo', payload);
  }

  @SubscribeMessage('update-status-todo')
  async handleUpdateState(
    _: Socket,
    payload: { _id: string; action: StatusType },
  ): Promise<void> {
    this.server.emit('update-status-todo', payload);
  }

  afterInit(server: Server) {
    console.log(server);
    //Do stuffs
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
    //Do stuffs
  }

  handleConnection(client: Socket) {
    console.log(`Connected ${client.id}`);
    //Do stuffs
  }
}
