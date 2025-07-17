import { TestBed } from '@angular/core/testing';

import { DependencyDocService } from './dependency-doc.service';

describe('DependencyDocService', () => {
  let service: DependencyDocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DependencyDocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
