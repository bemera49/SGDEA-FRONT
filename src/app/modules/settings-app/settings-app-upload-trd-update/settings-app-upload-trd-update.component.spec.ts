/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppUploadTrdUpdateComponent } from './settings-app-upload-trd-update.component';

describe('SettingsAppUploadTrdUpdateComponent', () => {
  let component: SettingsAppUploadTrdUpdateComponent;
  let fixture: ComponentFixture<SettingsAppUploadTrdUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppUploadTrdUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppUploadTrdUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
