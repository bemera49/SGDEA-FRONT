import { TestBed } from '@angular/core/testing';

import { CurrentStepOneService } from './current-step-one.service';

describe('CurrentStepOneService', () => {
  let service: CurrentStepOneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentStepOneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
