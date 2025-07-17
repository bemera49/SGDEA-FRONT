import { TestBed } from '@angular/core/testing';

import { NotificationDetailService } from './notification-detail.service';

describe('NotificationDetailService', () => {
  let service: NotificationDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
