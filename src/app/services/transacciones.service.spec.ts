/**

 */

import { TestBed } from '@angular/core/testing';

import { TransaccionesService } from './transacciones.service';

describe('TransaccionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransaccionesService = TestBed.get(TransaccionesService);
    expect(service).toBeTruthy();
  });
});
