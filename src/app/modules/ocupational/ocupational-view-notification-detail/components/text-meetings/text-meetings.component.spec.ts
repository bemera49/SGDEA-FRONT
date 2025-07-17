import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextMeetingsComponent } from './text-meetings.component';

describe('TextMeetingsComponent', () => {
  let component: TextMeetingsComponent;
  let fixture: ComponentFixture<TextMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextMeetingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TextMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
