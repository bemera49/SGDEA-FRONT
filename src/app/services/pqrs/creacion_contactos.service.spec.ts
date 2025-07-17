import { TestBed } from '@angular/core/testing';
import { CreacionContactosService } from './creacion_contactos.service';

describe('CreacionContactosService', () => {
  let service: CreacionContactosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreacionContactosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
