/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryViewfinderMainComponent } from './query-viewfinder-main.component';

describe('QueryViewfinderMainComponent', () => {
  let component: QueryViewfinderMainComponent;
  let fixture: ComponentFixture<QueryViewfinderMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryViewfinderMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryViewfinderMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
