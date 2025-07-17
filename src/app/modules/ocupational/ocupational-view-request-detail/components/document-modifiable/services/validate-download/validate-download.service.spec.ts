import { TestBed } from '@angular/core/testing';

import { ValidateDownloadService } from './validate-download.service';

describe('ValidateDownloadService', () => {
  let service: ValidateDownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateDownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
