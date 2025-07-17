import { TestBed } from '@angular/core/testing';

import { SubProcessInfoService } from './sub-process-info.service';

describe('SubProcessInfoService', () => {
  let service: SubProcessInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubProcessInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
