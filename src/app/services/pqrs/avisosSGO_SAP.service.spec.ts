import { TestBed } from '@angular/core/testing';
import { AvisosService } from './avisosSGO_SAP.service';

describe('AvisosService', () => {
  let service: AvisosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvisosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
