/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryViewfinderIndexComponent } from './query-viewfinder-index.component';

describe('QueryViewfinderIndexComponent', () => {
  let component: QueryViewfinderIndexComponent;
  let fixture: ComponentFixture<QueryViewfinderIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryViewfinderIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryViewfinderIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
