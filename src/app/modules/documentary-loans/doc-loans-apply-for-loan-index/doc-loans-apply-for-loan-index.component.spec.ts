/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocLoansApplyForLoanIndexComponent } from './doc-loans-apply-for-loan-index.component';

describe('DocLoansApplyForLoanIndexComponent', () => {
  let component: DocLoansApplyForLoanIndexComponent;
  let fixture: ComponentFixture<DocLoansApplyForLoanIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocLoansApplyForLoanIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocLoansApplyForLoanIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
