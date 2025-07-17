/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppTemVariablesFormComponent } from './settings-app-tem-variables-form.component';

describe('SettingsAppTemVariablesFormComponent', () => {
  let component: SettingsAppTemVariablesFormComponent;
  let fixture: ComponentFixture<SettingsAppTemVariablesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppTemVariablesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppTemVariablesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
