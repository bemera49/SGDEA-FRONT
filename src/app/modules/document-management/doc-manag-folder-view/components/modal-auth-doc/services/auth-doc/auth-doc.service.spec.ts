import { TestBed } from '@angular/core/testing';

import { AuthDocService } from './auth-doc.service';

describe('AuthDocService', () => {
  let service: AuthDocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthDocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
