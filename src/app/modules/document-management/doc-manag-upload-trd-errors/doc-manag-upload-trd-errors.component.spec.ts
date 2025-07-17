import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManagUploadTrdErrorsComponent } from './doc-manag-upload-trd-errors.component';

describe('DocManagUploadTrdErrorsComponent', () => {
  let component: DocManagUploadTrdErrorsComponent;
  let fixture: ComponentFixture<DocManagUploadTrdErrorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocManagUploadTrdErrorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocManagUploadTrdErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
