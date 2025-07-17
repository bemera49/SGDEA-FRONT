/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppUploadTrdCreateComponent } from './settings-app-upload-trd-create.component';

describe('SettingsAppUploadTrdCreateComponent', () => {
  let component: SettingsAppUploadTrdCreateComponent;
  let fixture: ComponentFixture<SettingsAppUploadTrdCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppUploadTrdCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppUploadTrdCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
