import { TestBed } from '@angular/core/testing';

import { ShareDataTableService } from './share-data-table.service';

describe('ShareDataTableService', () => {
  let service: ShareDataTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareDataTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
