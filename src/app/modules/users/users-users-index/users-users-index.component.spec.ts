/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersUsersIndexComponent } from './users-users-index.component';

describe('UsersUsersIndexComponent', () => {
  let component: UsersUsersIndexComponent;
  let fixture: ComponentFixture<UsersUsersIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersUsersIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersUsersIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
