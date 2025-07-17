import { TestBed } from '@angular/core/testing';

import { OcupationalResetIndexService } from './ocupational-reset-index.service';

describe('OcupationalResetIndexService', () => {
  let service: OcupationalResetIndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OcupationalResetIndexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
