import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';

describe('Rooms Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [RoomsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: RoomsController = module.get<RoomsController>(RoomsController);
    expect(controller).toBeDefined();
  });
});
