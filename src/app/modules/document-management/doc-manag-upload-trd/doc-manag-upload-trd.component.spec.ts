/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManagUploadTrdComponent } from './doc-manag-upload-trd.component';

describe('DocManagUploadTrdComponent', () => {
  let component: DocManagUploadTrdComponent;
  let fixture: ComponentFixture<DocManagUploadTrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocManagUploadTrdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocManagUploadTrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
