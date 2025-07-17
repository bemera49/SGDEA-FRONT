import { TestBed } from '@angular/core/testing';

import { TrdVersionAdministrationService } from './trd-version-administration.service';

describe('TrdVersionAdministrationService', () => {
  let service: TrdVersionAdministrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrdVersionAdministrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
