import { TestBed } from '@angular/core/testing';

import { RequestExtensionService } from './request-extension.service';

describe('RequestExtensionService', () => {
  let service: RequestExtensionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestExtensionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
