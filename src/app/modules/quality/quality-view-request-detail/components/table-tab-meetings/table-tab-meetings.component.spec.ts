import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTabMeetingsComponent } from './table-tab-meetings.component';

describe('TableTabMeetingsComponent', () => {
  let component: TableTabMeetingsComponent;
  let fixture: ComponentFixture<TableTabMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableTabMeetingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableTabMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
