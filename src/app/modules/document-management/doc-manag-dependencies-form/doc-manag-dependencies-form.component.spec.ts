/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManagDependenciesFormComponent } from './doc-manag-dependencies-form.component';

describe('DocManagDependenciesFormComponent', () => {
  let component: DocManagDependenciesFormComponent;
  let fixture: ComponentFixture<DocManagDependenciesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocManagDependenciesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocManagDependenciesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
