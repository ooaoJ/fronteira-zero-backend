import { Test, TestingModule } from '@nestjs/testing';
import { RoomPlayerStatsService } from './room_player_stats.service';

describe('RoomPlayerStatsService', () => {
  let service: RoomPlayerStatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomPlayerStatsService],
    }).compile();

    service = module.get<RoomPlayerStatsService>(RoomPlayerStatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
