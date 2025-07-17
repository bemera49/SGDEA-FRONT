import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMeetingsComponent } from './select-meetings.component';

describe('SelectMeetingsComponent', () => {
  let component: SelectMeetingsComponent;
  let fixture: ComponentFixture<SelectMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectMeetingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
