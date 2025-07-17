import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManagTypeDocumentComponent } from './doc-manag-type-document.component';

describe('DocManagTypeDocumentComponent', () => {
  let component: DocManagTypeDocumentComponent;
  let fixture: ComponentFixture<DocManagTypeDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocManagTypeDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocManagTypeDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
