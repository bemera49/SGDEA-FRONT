/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppThirdManagementViewComponent } from './settings-app-third-management-view.component';

describe('SettingsAppThirdManagementViewComponent', () => {
  let component: SettingsAppThirdManagementViewComponent;
  let fixture: ComponentFixture<SettingsAppThirdManagementViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppThirdManagementViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppThirdManagementViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
