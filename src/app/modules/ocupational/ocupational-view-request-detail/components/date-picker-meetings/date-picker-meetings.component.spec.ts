import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerMeetingsComponent } from './date-picker-meetings.component';

describe('DatePickerMeetingsComponent', () => {
  let component: DatePickerMeetingsComponent;
  let fixture: ComponentFixture<DatePickerMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatePickerMeetingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatePickerMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
