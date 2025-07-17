import { TestBed } from '@angular/core/testing';

import { ChangeTrazaService } from './change-traza.service';

describe('ChangeTrazaService', () => {
  let service: ChangeTrazaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeTrazaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
