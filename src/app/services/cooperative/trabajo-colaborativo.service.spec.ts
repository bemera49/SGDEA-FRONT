import { TestBed } from '@angular/core/testing';

import { TrabajoColaborativoService } from './trabajo-colaborativo.service';

describe('TrabajoColaborativoService', () => {
  let service: TrabajoColaborativoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrabajoColaborativoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
