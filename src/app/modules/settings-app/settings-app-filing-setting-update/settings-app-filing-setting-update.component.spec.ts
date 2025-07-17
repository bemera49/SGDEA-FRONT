/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppFilingSettingUpdateComponent } from './settings-app-filing-setting-update.component';

describe('SettingsAppFilingSettingUpdateComponent', () => {
  let component: SettingsAppFilingSettingUpdateComponent;
  let fixture: ComponentFixture<SettingsAppFilingSettingUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppFilingSettingUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppFilingSettingUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
