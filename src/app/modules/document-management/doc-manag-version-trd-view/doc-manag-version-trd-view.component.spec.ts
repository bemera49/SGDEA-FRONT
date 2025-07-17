/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManagVersionTrdViewComponent } from './doc-manag-version-trd-view.component';

describe('DocManagVersionTrdViewComponent', () => {
  let component: DocManagVersionTrdViewComponent;
  let fixture: ComponentFixture<DocManagVersionTrdViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocManagVersionTrdViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocManagVersionTrdViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
