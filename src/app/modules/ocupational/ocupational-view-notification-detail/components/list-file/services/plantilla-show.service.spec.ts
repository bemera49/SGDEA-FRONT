import { TestBed } from '@angular/core/testing';

import { PlantillaShowService } from './plantilla-show.service';

describe('PlantillaShowService', () => {
  let service: PlantillaShowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantillaShowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
