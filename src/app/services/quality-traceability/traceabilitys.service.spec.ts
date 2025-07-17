import { TestBed } from '@angular/core/testing';

import { TraceabilitysService } from './traceabilitys.service';

describe('TraceabilitysService', () => {
  let service: TraceabilitysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraceabilitysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
