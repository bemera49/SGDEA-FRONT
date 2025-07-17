/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcManagPhysicalSpaceViewComponent } from './arc-manag-physical-space-view.component';

describe('ArcManagPhysicalSpaceViewComponent', () => {
  let component: ArcManagPhysicalSpaceViewComponent;
  let fixture: ComponentFixture<ArcManagPhysicalSpaceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArcManagPhysicalSpaceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcManagPhysicalSpaceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
