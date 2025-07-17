/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppUserGroupsUpdateComponent } from './settings-app-user-groups-update.component';

describe('SettingsAppUserGroupsUpdateComponent', () => {
  let component: SettingsAppUserGroupsUpdateComponent;
  let fixture: ComponentFixture<SettingsAppUserGroupsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppUserGroupsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppUserGroupsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
