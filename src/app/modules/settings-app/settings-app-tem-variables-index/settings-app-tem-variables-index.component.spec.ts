/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppTemVariablesIndexComponent } from './settings-app-tem-variables-index.component';

describe('SettingsAppTemVariablesIndexComponent', () => {
  let component: SettingsAppTemVariablesIndexComponent;
  let fixture: ComponentFixture<SettingsAppTemVariablesIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppTemVariablesIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppTemVariablesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
