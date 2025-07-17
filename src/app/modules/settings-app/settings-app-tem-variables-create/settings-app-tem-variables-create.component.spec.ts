/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppTemVariablesCreateComponent } from './settings-app-tem-variables-create.component';

describe('SettingsAppTemVariablesCreateComponent', () => {
  let component: SettingsAppTemVariablesCreateComponent;
  let fixture: ComponentFixture<SettingsAppTemVariablesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppTemVariablesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppTemVariablesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
