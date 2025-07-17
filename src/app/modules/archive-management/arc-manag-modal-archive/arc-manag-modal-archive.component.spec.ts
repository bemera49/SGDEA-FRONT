/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcManagModalArchiveComponent } from './arc-manag-modal-archive.component';

describe('ArcManagModalArchiveComponent', () => {
  let component: ArcManagModalArchiveComponent;
  let fixture: ComponentFixture<ArcManagModalArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArcManagModalArchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcManagModalArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
