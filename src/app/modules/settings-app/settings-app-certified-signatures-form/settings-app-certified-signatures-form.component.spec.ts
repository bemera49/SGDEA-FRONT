/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppCertifiedSignaturesFormComponent } from './settings-app-certified-signatures-form.component';

describe('SettingsAppCertifiedSignaturesFormComponent', () => {
  let component: SettingsAppCertifiedSignaturesFormComponent;
  let fixture: ComponentFixture<SettingsAppCertifiedSignaturesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppCertifiedSignaturesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppCertifiedSignaturesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
