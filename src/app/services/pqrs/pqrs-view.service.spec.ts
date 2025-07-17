import { TestBed } from '@angular/core/testing';

import { PqrsViewService } from './pqrs-view.service';

describe('PqrsViewService', () => {
  let service: PqrsViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PqrsViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
