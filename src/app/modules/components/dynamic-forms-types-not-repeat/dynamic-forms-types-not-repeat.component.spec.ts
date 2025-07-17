/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormsTypesNotRepeatComponent } from './dynamic-forms-types-not-repeat.component';

describe('DynamicFormsTypesNotRepeatComponent', () => {
  let component: DynamicFormsTypesNotRepeatComponent;
  let fixture: ComponentFixture<DynamicFormsTypesNotRepeatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormsTypesNotRepeatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormsTypesNotRepeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
