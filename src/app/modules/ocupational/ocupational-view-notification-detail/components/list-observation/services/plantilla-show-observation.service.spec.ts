import { TestBed } from '@angular/core/testing';

import { PlantillaShowObservationService } from './plantilla-show-observation.service';

describe('PlantillaShowObservationService', () => {
  let service: PlantillaShowObservationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantillaShowObservationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
