/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppTemVariablesUpdateComponent } from './settings-app-tem-variables-update.component';

describe('SettingsAppTemVariablesUpdateComponent', () => {
  let component: SettingsAppTemVariablesUpdateComponent;
  let fixture: ComponentFixture<SettingsAppTemVariablesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppTemVariablesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppTemVariablesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
