import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManagLoanModalComponent } from './doc-manag-loan-modal.component';

describe('DocManagLoanModalComponent', () => {
  let component: DocManagLoanModalComponent;
  let fixture: ComponentFixture<DocManagLoanModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocManagLoanModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocManagLoanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
