/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersOperationsUpdateComponent } from './users-operations-update.component';

describe('UsersOperationsUpdateComponent', () => {
  let component: UsersOperationsUpdateComponent;
  let fixture: ComponentFixture<UsersOperationsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersOperationsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersOperationsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
