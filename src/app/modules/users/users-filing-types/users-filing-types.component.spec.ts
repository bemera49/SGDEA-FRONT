/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersFilingTypesComponent } from './users-filing-types.component';

describe('UsersFilingTypesComponent', () => {
  let component: UsersFilingTypesComponent;
  let fixture: ComponentFixture<UsersFilingTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersFilingTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersFilingTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
