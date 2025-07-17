/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcManagPhysicalSpaceUpdateComponent } from './arc-manag-physical-space-update.component';

describe('ArcManagPhysicalSpaceUpdateComponent', () => {
  let component: ArcManagPhysicalSpaceUpdateComponent;
  let fixture: ComponentFixture<ArcManagPhysicalSpaceUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArcManagPhysicalSpaceUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcManagPhysicalSpaceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
