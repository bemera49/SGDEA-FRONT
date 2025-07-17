/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilingIndexComponent } from './filing-index.component';

describe('FilingIndexComponent', () => {
  let component: FilingIndexComponent;
  let fixture: ComponentFixture<FilingIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilingIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilingIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
