/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppUserGroupsCreateComponent } from './settings-app-user-groups-create.component';

describe('SettingsAppUserGroupsCreateComponent', () => {
  let component: SettingsAppUserGroupsCreateComponent;
  let fixture: ComponentFixture<SettingsAppUserGroupsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppUserGroupsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppUserGroupsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
