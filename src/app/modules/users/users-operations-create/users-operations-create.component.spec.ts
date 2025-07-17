/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersOperationsCreateComponent } from './users-operations-create.component';

describe('UsersOperationsCreateComponent', () => {
  let component: UsersOperationsCreateComponent;
  let fixture: ComponentFixture<UsersOperationsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersOperationsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersOperationsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
