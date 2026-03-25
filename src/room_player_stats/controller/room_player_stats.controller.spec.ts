import { Test, TestingModule } from '@nestjs/testing';
import { RoomPlayerStatsController } from './room_player_stats.controller';

describe('RoomPlayerStatsController', () => {
  let controller: RoomPlayerStatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomPlayerStatsController],
    }).compile();

    controller = module.get<RoomPlayerStatsController>(RoomPlayerStatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
