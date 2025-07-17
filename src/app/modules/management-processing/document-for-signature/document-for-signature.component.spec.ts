import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentForSignatureComponent } from './document-for-signature.component';

describe('DocumentForSignatureComponent', () => {
  let component: DocumentForSignatureComponent;
  let fixture: ComponentFixture<DocumentForSignatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentForSignatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentForSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
