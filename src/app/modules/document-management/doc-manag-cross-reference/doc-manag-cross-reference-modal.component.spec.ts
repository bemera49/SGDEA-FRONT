/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManagCrossReferenceModalComponent } from './doc-manag-cross-reference-modal.component';

describe('DocManagCrossReferenceModalComponent', () => {
  let component: DocManagCrossReferenceModalComponent;
  let fixture: ComponentFixture<DocManagCrossReferenceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocManagCrossReferenceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocManagCrossReferenceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
