/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilingEmailIndexComponent } from './filing-email-index.component';

describe('FilingEmailIndexComponent', () => {
  let component: FilingEmailIndexComponent;
  let fixture: ComponentFixture<FilingEmailIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilingEmailIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilingEmailIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
