import { Test, TestingModule } from '@nestjs/testing';
import { ConstructionInGameController } from './construction_in_game.controller';

describe('ConstructionInGameController', () => {
  let controller: ConstructionInGameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConstructionInGameController],
    }).compile();

    controller = module.get<ConstructionInGameController>(ConstructionInGameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
