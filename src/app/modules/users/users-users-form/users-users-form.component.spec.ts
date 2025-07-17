/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersUsersFormComponent } from './users-users-form.component';

describe('UsersUsersFormComponent', () => {
  let component: UsersUsersFormComponent;
  let fixture: ComponentFixture<UsersUsersFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersUsersFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersUsersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
