/**

 */

import { TestBed } from '@angular/core/testing';

import { ActivateTranslateService } from './activate-translate.service';

describe('ActivateTranslateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActivateTranslateService = TestBed.get(ActivateTranslateService);
    expect(service).toBeTruthy();
  });
});
