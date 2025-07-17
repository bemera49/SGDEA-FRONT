import { TestBed } from '@angular/core/testing';

import { ProcesoDetallesService } from './proceso-detalles.service';

describe('ProcesoDetallesService', () => {
  let service: ProcesoDetallesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcesoDetallesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
