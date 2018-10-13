import { Message } from './message.model';
import { User } from './user.model';
import { prop, Ref, Typegoose } from 'typegoose';
import { ObjectID } from 'bson';

export class Room extends Typegoose {
  _id: ObjectID | string;

  @prop({required: true, maxlength: 20, minlength: 5})
  name: string;

  messages: Ref<Message[]>;

  connectedUsers: Ref<User[]>;
}
