/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocLoansManageLoanOfFilesIndexComponent } from './doc-loans-manage-loan-of-files-index.component';

describe('DocLoansManageLoanIndexComponent', () => {
  let component: DocLoansManageLoanOfFilesIndexComponent;
  let fixture: ComponentFixture<DocLoansManageLoanOfFilesIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocLoansManageLoanOfFilesIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocLoansManageLoanOfFilesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
