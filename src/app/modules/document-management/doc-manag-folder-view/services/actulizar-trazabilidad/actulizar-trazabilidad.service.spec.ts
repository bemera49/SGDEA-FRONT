import { TestBed } from '@angular/core/testing';

import { ActulizarTrazabilidadService } from './actulizar-trazabilidad.service';

describe('ActulizarTrazabilidadService', () => {
  let service: ActulizarTrazabilidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActulizarTrazabilidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
