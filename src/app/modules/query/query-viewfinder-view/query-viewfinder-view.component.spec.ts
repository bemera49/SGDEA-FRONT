/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryViewfinderViewComponent } from './query-viewfinder-view.component';

describe('QueryViewfinderViewComponent', () => {
  let component: QueryViewfinderViewComponent;
  let fixture: ComponentFixture<QueryViewfinderViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryViewfinderViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryViewfinderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
