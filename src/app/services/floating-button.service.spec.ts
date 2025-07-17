/**

 */

import { TestBed } from '@angular/core/testing';

import { FloatingButtonService } from './floating-button.service';

describe('FloatingButtonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FloatingButtonService = TestBed.get(FloatingButtonService);
    expect(service).toBeTruthy();
  });
});
