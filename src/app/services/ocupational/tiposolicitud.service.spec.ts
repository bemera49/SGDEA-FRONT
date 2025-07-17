import { TestBed } from '@angular/core/testing';

import { TiposolicitudService } from './tiposolicitud.service';

describe('TiposolicitudService', () => {
  let service: TiposolicitudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
