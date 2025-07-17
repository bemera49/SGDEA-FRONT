/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilingEmailViewContentComponent } from './filing-email-view-content.component';

describe('FilingEmailViewContentComponent', () => {
  let component: FilingEmailViewContentComponent;
  let fixture: ComponentFixture<FilingEmailViewContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilingEmailViewContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilingEmailViewContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
