/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocLoansHistoryLoanComponent } from './doc-loans-history-loan.component';

describe('DocLoansHistoryLoanComponent', () => {
  let component: DocLoansHistoryLoanComponent;
  let fixture: ComponentFixture<DocLoansHistoryLoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocLoansHistoryLoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocLoansHistoryLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
