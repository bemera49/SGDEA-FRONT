import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcupationalNotificationClosedIndexComponent } from './ocupational-notification-closed-index.component';

describe('OcupationalNotificationClosedIndexComponent', () => {
  let component: OcupationalNotificationClosedIndexComponent;
  let fixture: ComponentFixture<OcupationalNotificationClosedIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OcupationalNotificationClosedIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OcupationalNotificationClosedIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
