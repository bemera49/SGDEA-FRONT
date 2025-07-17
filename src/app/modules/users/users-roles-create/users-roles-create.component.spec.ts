/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRolesCreateComponent } from './users-roles-create.component';

describe('UsersRolesCreateComponent', () => {
  let component: UsersRolesCreateComponent;
  let fixture: ComponentFixture<UsersRolesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersRolesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersRolesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
