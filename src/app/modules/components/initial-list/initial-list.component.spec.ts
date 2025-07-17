/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialListComponent } from './initial-list.component';

describe('InitialListComponent', () => {
  let component: InitialListComponent;
  let fixture: ComponentFixture<InitialListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
