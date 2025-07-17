/**

 */

import { TestBed } from '@angular/core/testing';

import { GlobalAppService } from './global-app.service';

describe('GlobalAppService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalAppService = TestBed.get(GlobalAppService);
    expect(service).toBeTruthy();
  });
});
