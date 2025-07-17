/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppThirdManagementMassiveComponent } from './settings-app-third-management-massive.component';

describe('SettingsAppThirdManagementMassiveComponent', () => {
  let component: SettingsAppThirdManagementMassiveComponent;
  let fixture: ComponentFixture<SettingsAppThirdManagementMassiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppThirdManagementMassiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppThirdManagementMassiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
