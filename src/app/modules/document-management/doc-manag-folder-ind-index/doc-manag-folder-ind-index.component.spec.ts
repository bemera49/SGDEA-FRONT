/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManagFolderIndIndexComponent } from './doc-manag-folder-ind-index.component';

describe('DocManagFolderIndIndexComponent', () => {
  let component: DocManagFolderIndIndexComponent;
  let fixture: ComponentFixture<DocManagFolderIndIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocManagFolderIndIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocManagFolderIndIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
