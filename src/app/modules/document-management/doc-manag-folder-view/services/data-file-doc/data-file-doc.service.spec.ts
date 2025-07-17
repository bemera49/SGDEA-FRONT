import { TestBed } from '@angular/core/testing';

import { DataFileDocService } from './data-file-doc.service';

describe('DataFileDocService', () => {
  let service: DataFileDocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataFileDocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
