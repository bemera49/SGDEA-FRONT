/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppCertifiedSignaturesCreateComponent } from './settings-app-certified-signatures-create.component';

describe('SettingsAppCertifiedSignaturesCreateComponent', () => {
  let component: SettingsAppCertifiedSignaturesCreateComponent;
  let fixture: ComponentFixture<SettingsAppCertifiedSignaturesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppCertifiedSignaturesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppCertifiedSignaturesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
