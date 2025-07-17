/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentaryLoansMainComponent } from './documentary-loans-main.component';

describe('DocumentaryLoansMainComponent', () => {
  let component: DocumentaryLoansMainComponent;
  let fixture: ComponentFixture<DocumentaryLoansMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentaryLoansMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentaryLoansMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
