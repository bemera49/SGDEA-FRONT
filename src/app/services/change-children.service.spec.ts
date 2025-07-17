/**

 */

import { TestBed } from '@angular/core/testing';

import { ChangeChildrenService } from './change-children.service';

describe('ChangeChildrenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangeChildrenService = TestBed.get(ChangeChildrenService);
    expect(service).toBeTruthy();
  });
});
