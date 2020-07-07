import { Message } from './message.model';
import { Room } from './room.model';
import { prop, Ref, Typegoose } from 'typegoose';
import { ObjectID } from 'bson';

export class User extends Typegoose {
  _id?: ObjectID | string;

  @prop({required: true, maxlength: 20, minlength: 5})
  nickname: string;

  @prop({required: true})
  clientId: string;

  messages?: Ref<Message[]>;

  joinedRooms?: Ref<Room[]>;
}
