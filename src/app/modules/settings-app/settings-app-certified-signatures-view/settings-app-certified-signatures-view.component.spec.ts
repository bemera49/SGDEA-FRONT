/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppCertifiedSignaturesViewComponent } from './settings-app-certified-signatures-view.component';

describe('SettingsAppCertifiedSignaturesViewComponent', () => {
  let component: SettingsAppCertifiedSignaturesViewComponent;
  let fixture: ComponentFixture<SettingsAppCertifiedSignaturesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppCertifiedSignaturesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppCertifiedSignaturesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
