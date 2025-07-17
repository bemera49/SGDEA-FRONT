/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcManagPhysicalSpaceCreateComponent } from './arc-manag-physical-space-create.component';

describe('ArcManagPhysicalSpaceCreateComponent', () => {
  let component: ArcManagPhysicalSpaceCreateComponent;
  let fixture: ComponentFixture<ArcManagPhysicalSpaceCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArcManagPhysicalSpaceCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcManagPhysicalSpaceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
