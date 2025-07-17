/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManagFolderFormComponent } from './doc-manag-folder-form.component';

describe('DocManagFolderFormComponent', () => {
  let component: DocManagFolderFormComponent;
  let fixture: ComponentFixture<DocManagFolderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocManagFolderFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocManagFolderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
