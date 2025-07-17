import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalAssignmentsComponent } from './professional-assignments.component';

describe('ProfessionalAssignmentsComponent', () => {
  let component: ProfessionalAssignmentsComponent;
  let fixture: ComponentFixture<ProfessionalAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionalAssignmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
