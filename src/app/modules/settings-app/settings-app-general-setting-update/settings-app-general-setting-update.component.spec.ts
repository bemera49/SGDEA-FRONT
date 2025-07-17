/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppGeneralSettingUpdateComponent } from './settings-app-general-setting-update.component';

describe('SettingsAppGeneralSettingUpdateComponent', () => {
  let component: SettingsAppGeneralSettingUpdateComponent;
  let fixture: ComponentFixture<SettingsAppGeneralSettingUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppGeneralSettingUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppGeneralSettingUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
