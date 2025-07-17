import { TestBed } from '@angular/core/testing';

import { InfoDocService } from './info-doc.service';

describe('InfoDocService', () => {
  let service: InfoDocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfoDocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
