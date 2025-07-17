/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersOperationsIndexComponent } from './users-operations-index.component';

describe('UsersOperationsIndexComponent', () => {
  let component: UsersOperationsIndexComponent;
  let fixture: ComponentFixture<UsersOperationsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersOperationsIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersOperationsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
