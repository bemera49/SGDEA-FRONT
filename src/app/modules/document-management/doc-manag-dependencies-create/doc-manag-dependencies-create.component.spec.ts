/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManagDependenciesCreateComponent } from './doc-manag-dependencies-create.component';

describe('DocManagDependenciesCreateComponent', () => {
  let component: DocManagDependenciesCreateComponent;
  let fixture: ComponentFixture<DocManagDependenciesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocManagDependenciesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocManagDependenciesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
