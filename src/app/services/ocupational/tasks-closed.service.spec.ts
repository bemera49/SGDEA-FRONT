import { TestBed } from '@angular/core/testing';

import { TasksClosedService } from './tasks-closed.service';

describe('TasksClosedService', () => {
  let service: TasksClosedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksClosedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
