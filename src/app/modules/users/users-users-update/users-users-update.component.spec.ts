/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersUsersUpdateComponent } from './users-users-update.component';

describe('UsersUsersUpdateComponent', () => {
  let component: UsersUsersUpdateComponent;
  let fixture: ComponentFixture<UsersUsersUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersUsersUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersUsersUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
