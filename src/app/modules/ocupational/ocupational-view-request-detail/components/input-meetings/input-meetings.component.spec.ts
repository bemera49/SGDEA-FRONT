import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputMeetingsComponent } from './input-meetings.component';

describe('InputMeetingsComponent', () => {
  let component: InputMeetingsComponent;
  let fixture: ComponentFixture<InputMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputMeetingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
