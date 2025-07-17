/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilingFormComponent } from './filing-form.component';

describe('FilingFormComponent', () => {
  let component: FilingFormComponent;
  let fixture: ComponentFixture<FilingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
