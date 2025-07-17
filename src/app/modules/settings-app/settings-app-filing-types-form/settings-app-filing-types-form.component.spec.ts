/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppFilingTypesFormComponent } from './settings-app-filing-types-form.component';

describe('SettingsAppFilingTypesFormComponent', () => {
  let component: SettingsAppFilingTypesFormComponent;
  let fixture: ComponentFixture<SettingsAppFilingTypesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppFilingTypesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppFilingTypesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
