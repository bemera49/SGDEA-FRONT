/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilingCreateDetailResolutionComponent } from './filing-create-detail-resolution.component';

describe('FilingCreateDetailResolutionComponent', () => {
  let component: FilingCreateDetailResolutionComponent;
  let fixture: ComponentFixture<FilingCreateDetailResolutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilingCreateDetailResolutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilingCreateDetailResolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
