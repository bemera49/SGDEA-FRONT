import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUploadDocumentComponent } from './modal-upload-document.component';

describe('ModalUploadDocumentComponent', () => {
  let component: ModalUploadDocumentComponent;
  let fixture: ComponentFixture<ModalUploadDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalUploadDocumentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalUploadDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
