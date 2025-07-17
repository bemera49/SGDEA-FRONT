import { TestBed } from '@angular/core/testing';

import { PermisosDocService } from './permisos-doc.service';

describe('PermisosDocService', () => {
  let service: PermisosDocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermisosDocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
