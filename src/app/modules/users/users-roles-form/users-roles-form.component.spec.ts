/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRolesFormComponent } from './users-roles-form.component';

describe('UsersRolesFormComponent', () => {
  let component: UsersRolesFormComponent;
  let fixture: ComponentFixture<UsersRolesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersRolesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersRolesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
