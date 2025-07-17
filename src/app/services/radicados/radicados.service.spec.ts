import { TestBed } from '@angular/core/testing';

import { RadicadosService } from './radicados.service';

describe('RadicadosService', () => {
  let service: RadicadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RadicadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
