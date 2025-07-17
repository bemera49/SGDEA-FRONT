/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManagDependenciesVersionEditComponent } from './doc-manag-dependencies-version-edit.component';

describe('DocManagDependenciesVersionEditComponent', () => {
  let component: DocManagDependenciesVersionEditComponent;
  let fixture: ComponentFixture<DocManagDependenciesVersionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocManagDependenciesVersionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocManagDependenciesVersionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
