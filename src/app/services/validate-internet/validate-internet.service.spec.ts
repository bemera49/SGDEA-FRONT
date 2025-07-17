import { TestBed } from '@angular/core/testing';

import { ValidateInternetService } from './validate-internet.service';

describe('ValidateInternetService', () => {
  let service: ValidateInternetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateInternetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
