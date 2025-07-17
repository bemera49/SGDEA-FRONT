/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilingEmailFormComponent } from './filing-email-form.component';

describe('FilingEmailFormComponent', () => {
  let component: FilingEmailFormComponent;
  let fixture: ComponentFixture<FilingEmailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilingEmailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilingEmailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
