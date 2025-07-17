/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManagDependenciesVersionViewComponent } from './doc-manag-dependencies-version-view.component';

describe('DocManagDependenciesVersionViewComponent', () => {
  let component: DocManagDependenciesVersionViewComponent;
  let fixture: ComponentFixture<DocManagDependenciesVersionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocManagDependenciesVersionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocManagDependenciesVersionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
