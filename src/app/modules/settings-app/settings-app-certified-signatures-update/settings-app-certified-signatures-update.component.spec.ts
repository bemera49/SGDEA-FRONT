/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppCertifiedSignaturesUpdateComponent } from './settings-app-certified-signatures-update.component';

describe('SettingsAppCertifiedSignaturesUpdateComponent', () => {
  let component: SettingsAppCertifiedSignaturesUpdateComponent;
  let fixture: ComponentFixture<SettingsAppCertifiedSignaturesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppCertifiedSignaturesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppCertifiedSignaturesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
