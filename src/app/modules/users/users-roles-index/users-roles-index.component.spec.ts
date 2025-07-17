/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRolesIndexComponent } from './users-roles-index.component';

describe('UsersRolesIndexComponent', () => {
  let component: UsersRolesIndexComponent;
  let fixture: ComponentFixture<UsersRolesIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersRolesIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersRolesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
