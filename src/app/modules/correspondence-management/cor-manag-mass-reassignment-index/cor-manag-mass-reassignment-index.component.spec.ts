/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorManagMassReassignmentIndexComponent } from './cor-manag-mass-reassignment-index.component';

describe('CorManagMassReassignmentIndexComponent', () => {
  let component: CorManagMassReassignmentIndexComponent;
  let fixture: ComponentFixture<CorManagMassReassignmentIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorManagMassReassignmentIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorManagMassReassignmentIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
