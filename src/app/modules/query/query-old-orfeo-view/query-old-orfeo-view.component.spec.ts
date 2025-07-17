/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryOldOrfeoViewComponent } from './query-old-orfeo-view.component';

describe('QueryOldOrfeoViewComponent', () => {
  let component: QueryOldOrfeoViewComponent;
  let fixture: ComponentFixture<QueryOldOrfeoViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryOldOrfeoViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryOldOrfeoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
