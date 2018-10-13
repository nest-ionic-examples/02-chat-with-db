import { Message } from './message';
import { User } from './user';

export interface Room {
  _id?: string;
  name?: string;
  messages?: Message[];
  connectedUsers?: User[];
}
