import { TestBed } from '@angular/core/testing';

import { RequestCreateService } from './request-create.service';

describe('RequestCreateService', () => {
  let service: RequestCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
