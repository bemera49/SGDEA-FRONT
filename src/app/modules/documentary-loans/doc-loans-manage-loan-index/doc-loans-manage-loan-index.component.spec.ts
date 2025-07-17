/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocLoansManageLoanIndexComponent } from './doc-loans-manage-loan-index.component';

describe('DocLoansManageLoanIndexComponent', () => {
  let component: DocLoansManageLoanIndexComponent;
  let fixture: ComponentFixture<DocLoansManageLoanIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocLoansManageLoanIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocLoansManageLoanIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
