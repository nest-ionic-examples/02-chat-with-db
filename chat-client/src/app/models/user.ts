import { Message } from './message';
import { Room } from './room';

export interface User {
  _id?: string;
  nickname?: string;
  clientId?: string;
  messages?: Message[];
  joinedRooms?: Room[];
}
