/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppProvidesExternalUpdateComponent } from './settings-app-provides-external-update.component';

describe('SettingsAppProvidesExternalUpdateComponent', () => {
  let component: SettingsAppProvidesExternalUpdateComponent;
  let fixture: ComponentFixture<SettingsAppProvidesExternalUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppProvidesExternalUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppProvidesExternalUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
