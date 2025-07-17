import { TestBed } from '@angular/core/testing';

import { AnalystsService } from './analysts.service';

describe('AnalystsService', () => {
  let service: AnalystsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalystsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
