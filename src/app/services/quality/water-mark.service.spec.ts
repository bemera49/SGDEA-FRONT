import { TestBed } from '@angular/core/testing';

import { WaterMarkService } from './water-mark.service';

describe('WaterMarkService', () => {
  let service: WaterMarkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WaterMarkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
