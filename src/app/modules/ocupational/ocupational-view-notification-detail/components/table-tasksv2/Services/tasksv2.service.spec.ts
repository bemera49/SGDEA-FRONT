import { TestBed } from '@angular/core/testing';

import { Tasksv2Service } from './tasksv2.service';

describe('Tasksv2Service', () => {
  let service: Tasksv2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tasksv2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
