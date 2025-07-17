import { TestBed } from '@angular/core/testing';

import { TrasladoCompetenciaService } from './traslado-competencia.service';

describe('TrasladoCompetenciaService', () => {
  let service: TrasladoCompetenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrasladoCompetenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
