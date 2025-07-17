import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcupationalNotificationIndexComponent } from './ocupational-notification-index.component';

describe('OcupationalNotificationIndexComponent', () => {
  let component: OcupationalNotificationIndexComponent;
  let fixture: ComponentFixture<OcupationalNotificationIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OcupationalNotificationIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OcupationalNotificationIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
