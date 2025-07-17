/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilingViewComponent } from './filing-view.component';

describe('FilingViewComponent', () => {
  let component: FilingViewComponent;
  let fixture: ComponentFixture<FilingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
