/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilingEmailLoginComponent } from './filing-email-login.component';

describe('FilingEmailLoginComponent', () => {
  let component: FilingEmailLoginComponent;
  let fixture: ComponentFixture<FilingEmailLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilingEmailLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilingEmailLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
