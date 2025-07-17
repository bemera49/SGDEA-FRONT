/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManagVersionTrdIndexComponent } from './doc-manag-version-trd-index.component';

describe('DocManagVersionTrdIndexComponent', () => {
  let component: DocManagVersionTrdIndexComponent;
  let fixture: ComponentFixture<DocManagVersionTrdIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocManagVersionTrdIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocManagVersionTrdIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
