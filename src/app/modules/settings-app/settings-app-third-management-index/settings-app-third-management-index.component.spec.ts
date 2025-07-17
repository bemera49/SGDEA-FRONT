/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppThirdManagementIndexComponent } from './settings-app-third-management-index.component';

describe('SettingsAppThirdManagementIndexComponent', () => {
  let component: SettingsAppThirdManagementIndexComponent;
  let fixture: ComponentFixture<SettingsAppThirdManagementIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppThirdManagementIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppThirdManagementIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
