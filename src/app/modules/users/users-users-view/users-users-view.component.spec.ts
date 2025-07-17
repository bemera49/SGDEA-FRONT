/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersUsersViewComponent } from './users-users-view.component';

describe('UsersUsersViewComponent', () => {
  let component: UsersUsersViewComponent;
  let fixture: ComponentFixture<UsersUsersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersUsersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersUsersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
