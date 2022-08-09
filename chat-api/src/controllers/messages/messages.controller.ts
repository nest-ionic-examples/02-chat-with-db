import { Controller, Get, Query } from '@nestjs/common';
import { Message } from '../../models/message.model';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";

@Controller('api/messages')
export class MessagesController {
  constructor(@InjectModel(Message.name) private readonly model: Model<Message>) {} // <1>

  @Get()
  find(@Query('where') where) { // <2>
    where = JSON.parse(where || '{}');
    return this.model.find(where).populate('owner').exec();
  }
}
