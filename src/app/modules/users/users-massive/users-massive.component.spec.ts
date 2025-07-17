/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersMassiveComponent } from './users-massive.component';

describe('UsersMassiveComponent', () => {
  let component: UsersMassiveComponent;
  let fixture: ComponentFixture<UsersMassiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersMassiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersMassiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
