/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersOperationsFormComponent } from './users-operations-form.component';

describe('UsersOperationsFormComponent', () => {
  let component: UsersOperationsFormComponent;
  let fixture: ComponentFixture<UsersOperationsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersOperationsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersOperationsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
