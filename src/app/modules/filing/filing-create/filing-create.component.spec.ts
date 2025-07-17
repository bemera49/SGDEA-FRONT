/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilingCreateComponent } from './filing-create.component';

describe('FilingCreateComponent', () => {
  let component: FilingCreateComponent;
  let fixture: ComponentFixture<FilingCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilingCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
