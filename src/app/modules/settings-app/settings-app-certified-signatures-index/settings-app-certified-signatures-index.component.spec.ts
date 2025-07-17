/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppCertifiedSignaturesIndexComponent } from './settings-app-certified-signatures-index.component';

describe('SettingsAppCertifiedSignaturesIndexComponent', () => {
  let component: SettingsAppCertifiedSignaturesIndexComponent;
  let fixture: ComponentFixture<SettingsAppCertifiedSignaturesIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppCertifiedSignaturesIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppCertifiedSignaturesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
