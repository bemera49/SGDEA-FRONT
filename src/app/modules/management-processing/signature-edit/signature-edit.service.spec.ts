import { TestBed } from '@angular/core/testing';

import { SignatureEditService } from './signature-edit.service';

describe('SignatureEditService', () => {
  let service: SignatureEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignatureEditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
