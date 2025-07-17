/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPdfModalSignatureComponent } from './view-pdf-modal-signature.component';

describe('ViewPdfModalSignatureComponent', () => {
  let component: ViewPdfModalSignatureComponent;
  let fixture: ComponentFixture<ViewPdfModalSignatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPdfModalSignatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPdfModalSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
