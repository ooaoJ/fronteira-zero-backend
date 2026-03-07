import { Test, TestingModule } from '@nestjs/testing';
import { PlayerResourceService } from './player_resource.service';

describe('PlayerResourceService', () => {
  let service: PlayerResourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerResourceService],
    }).compile();

    service = module.get<PlayerResourceService>(PlayerResourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
