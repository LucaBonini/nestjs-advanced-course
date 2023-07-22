import { Test, TestingModule } from '@nestjs/testing';
import { I18nsService } from './i18n.service';

describe('I18nsService', () => {
  let service: I18nsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [I18nsService],
    }).compile();

    service = module.get<I18nsService>(I18nsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
