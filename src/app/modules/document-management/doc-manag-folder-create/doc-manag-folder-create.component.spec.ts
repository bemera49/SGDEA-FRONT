/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManagFolderCreateComponent } from './doc-manag-folder-create.component';

describe('DocManagFolderCreateComponent', () => {
  let component: DocManagFolderCreateComponent;
  let fixture: ComponentFixture<DocManagFolderCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocManagFolderCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocManagFolderCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
