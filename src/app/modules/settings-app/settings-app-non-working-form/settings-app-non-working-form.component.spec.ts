/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppNonWorkingFormComponent } from './settings-app-non-working-form.component';

describe('SettingsAppNonWorkingFormComponent', () => {
  let component: SettingsAppNonWorkingFormComponent;
  let fixture: ComponentFixture<SettingsAppNonWorkingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppNonWorkingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppNonWorkingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
