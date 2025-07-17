/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersUsersCreateComponent } from './users-users-create.component';

describe('UsersUsersCreateComponent', () => {
  let component: UsersUsersCreateComponent;
  let fixture: ComponentFixture<UsersUsersCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersUsersCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersUsersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
