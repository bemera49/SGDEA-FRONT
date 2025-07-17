import { TestBed } from '@angular/core/testing';

import { TreeDocumentsService } from './tree-documents.service';

describe('TreeDocumentsService', () => {
  let service: TreeDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreeDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
