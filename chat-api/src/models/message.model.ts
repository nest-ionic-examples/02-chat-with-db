import { prop, Ref, Typegoose } from 'typegoose';
import { User } from './user.model';
import { Room } from './room.model';
import { ObjectID } from 'bson';

export class Message extends Typegoose {

  _id: ObjectID | string;

  @prop({required: true})
  text: string;

  @prop({required: true})
  created: Date;

  @prop({required: true, ref: User})
  owner: Ref<User>;

  @prop({required: true, ref: Room})
  room: Ref<Room> | string;
}
