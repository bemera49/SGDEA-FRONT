/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormsTypesRepeatComponent } from './dynamic-forms-types-repeat.component';

describe('DynamicFormsTypesRepeatComponent', () => {
  let component: DynamicFormsTypesRepeatComponent;
  let fixture: ComponentFixture<DynamicFormsTypesRepeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormsTypesRepeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormsTypesRepeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
