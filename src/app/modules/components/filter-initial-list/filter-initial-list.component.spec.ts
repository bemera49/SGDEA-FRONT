/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterInitialListComponent } from './filter-initial-list.component';

describe('FilterInitialListComponent', () => {
  let component: FilterInitialListComponent;
  let fixture: ComponentFixture<FilterInitialListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterInitialListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterInitialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
