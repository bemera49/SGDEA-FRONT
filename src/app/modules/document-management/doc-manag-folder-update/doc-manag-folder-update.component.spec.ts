/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManagFolderUpdateComponent } from './doc-manag-folder-update.component';

describe('DocManagFolderUpdateComponent', () => {
  let component: DocManagFolderUpdateComponent;
  let fixture: ComponentFixture<DocManagFolderUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocManagFolderUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocManagFolderUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
