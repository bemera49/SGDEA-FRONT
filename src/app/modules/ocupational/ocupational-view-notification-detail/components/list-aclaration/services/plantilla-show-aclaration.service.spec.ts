import { TestBed } from '@angular/core/testing';

import { PlantillaShowAclarationService } from './plantilla-show-aclaration.service';

describe('PlantillaShowAclarationService', () => {
  let service: PlantillaShowAclarationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantillaShowAclarationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
