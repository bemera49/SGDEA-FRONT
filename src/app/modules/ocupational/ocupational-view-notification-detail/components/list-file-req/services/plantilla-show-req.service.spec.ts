import { TestBed } from '@angular/core/testing';

import { PlantillaShowReqService } from './plantilla-show-req.service';

describe('PlantillaShowReqService', () => {
  let service: PlantillaShowReqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantillaShowReqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
