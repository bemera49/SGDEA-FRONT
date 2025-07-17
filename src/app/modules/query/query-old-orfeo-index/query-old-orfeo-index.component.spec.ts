/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryOldOrfeoIndexComponent } from './query-old-orfeo-index.component';

describe('QueryOldOrfeoIndexComponent', () => {
  let component: QueryOldOrfeoIndexComponent;
  let fixture: ComponentFixture<QueryOldOrfeoIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryOldOrfeoIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryOldOrfeoIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
