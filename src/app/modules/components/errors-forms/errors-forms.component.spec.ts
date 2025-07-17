/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsFormsComponent } from './errors-forms.component';

describe('ErrorsFormsComponent', () => {
  let component: ErrorsFormsComponent;
  let fixture: ComponentFixture<ErrorsFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorsFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorsFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
