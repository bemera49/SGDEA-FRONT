import { TestBed } from '@angular/core/testing';

import { InterceptorDataService } from './interceptor-data.service';

describe('InterceptorDataService', () => {
  let service: InterceptorDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptorDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
