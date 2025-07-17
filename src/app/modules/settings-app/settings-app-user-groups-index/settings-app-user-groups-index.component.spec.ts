/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppUserGroupsIndexComponent } from './settings-app-user-groups-index.component';

describe('SettingsAppUserGroupsIndexComponent', () => {
  let component: SettingsAppUserGroupsIndexComponent;
  let fixture: ComponentFixture<SettingsAppUserGroupsIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppUserGroupsIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppUserGroupsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
