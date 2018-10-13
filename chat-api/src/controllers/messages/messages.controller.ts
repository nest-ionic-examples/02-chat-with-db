import { Controller, Get, Query } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Message } from '../../models/message.model';
import { ModelType } from 'typegoose';

@Controller('api/messages')
export class MessagesController {
  constructor(@InjectModel(Message) private readonly model: ModelType<Message>) {} // <1>

  @Get()
  find(@Query('where') where) { // <2>
    where = JSON.parse(where || '{}');
    return this.model.find(where).populate('owner').exec();
  }
}
