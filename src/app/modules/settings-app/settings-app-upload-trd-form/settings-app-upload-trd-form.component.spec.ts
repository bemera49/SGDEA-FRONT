/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppUploadTrdFormComponent } from './settings-app-upload-trd-form.component';

describe('SettingsAppUploadTrdFormComponent', () => {
  let component: SettingsAppUploadTrdFormComponent;
  let fixture: ComponentFixture<SettingsAppUploadTrdFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppUploadTrdFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppUploadTrdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
