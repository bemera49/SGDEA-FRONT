/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManagFolderViewComponent } from './doc-manag-folder-view.component';

describe('DocManagFolderViewComponent', () => {
  let component: DocManagFolderViewComponent;
  let fixture: ComponentFixture<DocManagFolderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocManagFolderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocManagFolderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
