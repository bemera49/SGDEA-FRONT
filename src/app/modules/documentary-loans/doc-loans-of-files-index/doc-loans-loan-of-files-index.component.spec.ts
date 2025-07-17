/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocLoansLoanOfFilesIndexComponent } from './doc-loans-loan-of-files-index.component';

describe('DocLoansManageLoanIndexComponent', () => {
  let component: DocLoansLoanOfFilesIndexComponent;
  let fixture: ComponentFixture<DocLoansLoanOfFilesIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocLoansLoanOfFilesIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocLoansLoanOfFilesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
