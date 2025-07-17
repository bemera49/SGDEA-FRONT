import { TestBed } from '@angular/core/testing';

import { DgcpValidationService } from './dgcp-validation.service';

describe('DgcpValidationService', () => {
  let service: DgcpValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DgcpValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
