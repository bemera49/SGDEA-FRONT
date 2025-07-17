/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppThirdManagementUpdateComponent } from './settings-app-third-management-update.component';

describe('SettingsAppThirdManagementUpdateComponent', () => {
  let component: SettingsAppThirdManagementUpdateComponent;
  let fixture: ComponentFixture<SettingsAppThirdManagementUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppThirdManagementUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppThirdManagementUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
