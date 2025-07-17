import { TestBed } from '@angular/core/testing';

import { TreeProcessService } from './tree-process.service';

describe('TreeProcessService', () => {
  let service: TreeProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreeProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
