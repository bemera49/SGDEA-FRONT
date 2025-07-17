/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcManagPhysicalSpaceIndexComponent } from './arc-manag-physical-space-index.component';

describe('ArcManagPhysicalSpaceIndexComponent', () => {
  let component: ArcManagPhysicalSpaceIndexComponent;
  let fixture: ComponentFixture<ArcManagPhysicalSpaceIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArcManagPhysicalSpaceIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcManagPhysicalSpaceIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
