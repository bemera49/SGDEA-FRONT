import { TestBed } from '@angular/core/testing';

import { ShareInformationFiltersService } from './ShareInformationFiltersService';

describe('ShareInformationFiltersService', () => {
  let service: ShareInformationFiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareInformationFiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
