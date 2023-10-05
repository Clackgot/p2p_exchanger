import { Test, TestingModule } from '@nestjs/testing';
import { TrongridService } from './trongrid.service';

describe('TrongridService', () => {
  let service: TrongridService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrongridService],
    }).compile();

    service = module.get<TrongridService>(TrongridService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
