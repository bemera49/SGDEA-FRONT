import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcupationalViewNotificationDetailComponent } from './ocupational-view-notification-detail.component';

describe('OcupationalViewNotificationDetailComponent', () => {
  let component: OcupationalViewNotificationDetailComponent;
  let fixture: ComponentFixture<OcupationalViewNotificationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OcupationalViewNotificationDetailComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OcupationalViewNotificationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
