import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesGateway } from './gateways/messages/messages.gateway';
// tag::import-messages-controller[]
import { MessagesController } from './controllers/messages/messages.controller';
// end::import-messages-controller[]
import { RoomsController } from './controllers/rooms/rooms.controller';
import { MongooseModule } from "@nestjs/mongoose"; // <1>
import { Message, MessageSchema } from './models/message.model';
import { Room, RoomSchema } from './models/room.model';
import { User, UserSchema } from './models/user.model';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://chat-admin:password123@localhost/chat', {}), // <2>
    MongooseModule.forFeature([
      {name: Message.name, schema: MessageSchema},
      {name: Room.name, schema: RoomSchema},
      {name: User.name, schema: UserSchema}
    ]), // <3>
  ],
  controllers: [
    AppController,
    RoomsController,
    // tag::messages-controller[]
    MessagesController,
    // end::messages-controller[]
  ],
  providers: [AppService, MessagesGateway],
})
export class AppModule {
}
