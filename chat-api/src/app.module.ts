import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesGateway } from './gateways/messages/messages.gateway';
// tag::import-messages-controller[]
import { MessagesController } from './controllers/messages/messages.controller';
// end::import-messages-controller[]
import { RoomsController } from './controllers/rooms/rooms.controller';
import { TypegooseModule } from 'nestjs-typegoose'; // <1>
import { Message } from './models/message.model';
import { Room } from './models/room.model';
import { User } from './models/user.model';

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://chat-admin:password123@localhost/chat', {}), // <2>
    TypegooseModule.forFeature([Message, Room, User]), // <3>
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
export class AppModule {}
