/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocManagDependenciesUpdateComponent } from './doc-manag-dependencies-update.component';

describe('DocManagDependenciesUpdateComponent', () => {
  let component: DocManagDependenciesUpdateComponent;
  let fixture: ComponentFixture<DocManagDependenciesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocManagDependenciesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocManagDependenciesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
