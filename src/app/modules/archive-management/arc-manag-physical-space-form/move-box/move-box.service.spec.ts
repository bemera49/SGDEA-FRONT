import { TestBed } from '@angular/core/testing';

import { MoveBoxService } from './move-box.service';

describe('MoveBoxService', () => {
  let service: MoveBoxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoveBoxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
