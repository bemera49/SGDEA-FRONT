/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcManagArchiveLocationComponent } from './arc-manag-archive-location.component';

describe('ArcManagArchiveLocationComponent', () => {
  let component: ArcManagArchiveLocationComponent;
  let fixture: ComponentFixture<ArcManagArchiveLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArcManagArchiveLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArcManagArchiveLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
