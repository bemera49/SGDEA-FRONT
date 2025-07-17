import { TestBed } from '@angular/core/testing';

import { QualityDetailsService } from './quality-details.service';

describe('QualityDetailsService', () => {
  let service: QualityDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QualityDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
