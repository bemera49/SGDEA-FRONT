import { TestBed } from '@angular/core/testing';

import { AnalysisRequestsService } from './analysis-requests.service';

describe('AnalysisRequestsService', () => {
  let service: AnalysisRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalysisRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
