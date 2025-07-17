/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppProvidesExternalFormComponent } from './settings-app-provides-external-form.component';

describe('SettingsAppProvidesExternalFormComponent', () => {
  let component: SettingsAppProvidesExternalFormComponent;
  let fixture: ComponentFixture<SettingsAppProvidesExternalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppProvidesExternalFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppProvidesExternalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
