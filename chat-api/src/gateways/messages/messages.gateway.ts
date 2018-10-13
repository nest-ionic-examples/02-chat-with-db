import { OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { ModelType } from 'typegoose';
import { Message } from '../../models/message.model';
import { User } from '../../models/user.model';
import { Room } from '../../models/room.model';
import { InjectModel } from 'nestjs-typegoose';

@WebSocketGateway()
export class MessagesGateway implements OnGatewayDisconnect {

  constructor(@InjectModel(Message) private readonly messagesModel: ModelType<Message>,
              @InjectModel(Room) private readonly roomsModel: ModelType<Room>,
              @InjectModel(User) private readonly usersModel: ModelType<User>) { // <1>
  }

  async handleDisconnect(client: Socket) { // <2>
    const user = await this.usersModel.findOne({clientId: client.id});
    if (user) {
      client.server.emit('users-changed', {user: user.nickname, event: 'left'});
      user.clientId = null;
      await this.usersModel.findByIdAndUpdate(user._id, user);
    }
  }

  @SubscribeMessage('enter-chat-room') // <3>
  async enterChatRoom(client: Socket, data: { nickname: string, roomId: string }) {
    let user = await this.usersModel.findOne({nickname: data.nickname});
    if (!user) {
      user = await this.usersModel.create({nickname: data.nickname, clientId: client.id});
    } else {
      user.clientId = client.id;
      user = await this.usersModel.findByIdAndUpdate(user._id, user, {new: true});
    }
    client.join(data.roomId).broadcast.to(data.roomId)
      .emit('users-changed', {user: user.nickname, event: 'joined'}); // <3>
  }

  @SubscribeMessage('leave-chat-room') // <4>
  async leaveChatRoom(client: Socket, data: { nickname: string, roomId: string }) {
    const user = await this.usersModel.findOne({nickname: data.nickname});
    client.broadcast.to(data.roomId).emit('users-changed', {user: user.nickname, event: 'left'}); // <3>
    client.leave(data.roomId);
  }

  @SubscribeMessage('add-message') // <5>
  async addMessage(client: Socket, message: Message) {
    message.owner = await this.usersModel.findOne({clientId: client.id});
    message.created = new Date();
    message = await this.messagesModel.create(message);
    client.server.in(message.room as string).emit('message', message);
  }
}
