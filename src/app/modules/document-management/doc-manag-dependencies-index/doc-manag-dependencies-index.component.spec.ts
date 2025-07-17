/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManagDependenciesIndexComponent } from './doc-manag-dependencies-index.component';

describe('DocManagDependenciesIndexComponent', () => {
  let component: DocManagDependenciesIndexComponent;
  let fixture: ComponentFixture<DocManagDependenciesIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocManagDependenciesIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocManagDependenciesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
