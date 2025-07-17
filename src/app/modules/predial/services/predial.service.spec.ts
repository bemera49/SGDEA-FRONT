import { TestBed } from '@angular/core/testing';

import { PredialService } from './predial.service';

describe('PredialService', () => {
  let service: PredialService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PredialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
