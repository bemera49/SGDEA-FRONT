import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManagLoanViewComponent } from './doc-manag-loan-view.component';

describe('DocManagLoanViewComponent', () => {
  let component: DocManagLoanViewComponent;
  let fixture: ComponentFixture<DocManagLoanViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocManagLoanViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocManagLoanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
