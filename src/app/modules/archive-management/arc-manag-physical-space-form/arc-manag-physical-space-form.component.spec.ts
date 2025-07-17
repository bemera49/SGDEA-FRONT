/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcManagPhysicalSpaceFormComponent } from './arc-manag-physical-space-form.component';

describe('ArcManagPhysicalSpaceFormComponent', () => {
  let component: ArcManagPhysicalSpaceFormComponent;
  let fixture: ComponentFixture<ArcManagPhysicalSpaceFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArcManagPhysicalSpaceFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcManagPhysicalSpaceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
