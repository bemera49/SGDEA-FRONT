import { TestBed } from '@angular/core/testing';

import { DataDocParamsService } from './data-doc-params.service';

describe('DataDocParamsService', () => {
  let service: DataDocParamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataDocParamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
