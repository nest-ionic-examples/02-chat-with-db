import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from './messages.controller';

describe('Messages Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [MessagesController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: MessagesController = module.get<MessagesController>(MessagesController);
    expect(controller).toBeDefined();
  });
});
