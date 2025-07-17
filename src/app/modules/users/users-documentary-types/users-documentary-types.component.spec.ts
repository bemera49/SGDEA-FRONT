/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDocumentaryTypesComponent } from './users-documentary-types.component';

describe('UsersDocumentaryTypesComponent', () => {
  let component: UsersDocumentaryTypesComponent;
  let fixture: ComponentFixture<UsersDocumentaryTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersDocumentaryTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersDocumentaryTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
