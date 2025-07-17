/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppProvidesExternalIndexComponent } from './settings-app-provides-external-index.component';

describe('SettingsAppProvidesExternalIndexComponent', () => {
  let component: SettingsAppProvidesExternalIndexComponent;
  let fixture: ComponentFixture<SettingsAppProvidesExternalIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppProvidesExternalIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppProvidesExternalIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
