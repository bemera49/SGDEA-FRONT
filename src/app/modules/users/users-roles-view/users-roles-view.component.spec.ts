/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRolesViewComponent } from './users-roles-view.component';

describe('UsersRolesViewComponent', () => {
  let component: UsersRolesViewComponent;
  let fixture: ComponentFixture<UsersRolesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersRolesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersRolesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
