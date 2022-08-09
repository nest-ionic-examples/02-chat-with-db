import {Message} from './message.model';
import {User} from './user.model';
import {ObjectID} from 'bson';
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Types} from "mongoose";

@Schema()
export class Room {
  _id: ObjectID | string;

  @Prop({required: true, maxlength: 20, minlength: 5})
  name: string;

  @Prop({type: [{type: Types.ObjectId, ref: 'Message'}]})
  messages: Message[];

  @Prop({type: [{type: Types.ObjectId, ref: 'User'}]})
  connectedUsers: User[];
}

export const RoomSchema = SchemaFactory.createForClass(Room)
