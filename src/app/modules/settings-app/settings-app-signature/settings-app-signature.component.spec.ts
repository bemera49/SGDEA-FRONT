/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppSignatureComponent } from './settings-app-signature.component';

describe('SettingsAppSignatureComponent', () => {
  let component: SettingsAppSignatureComponent;
  let fixture: ComponentFixture<SettingsAppSignatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppSignatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
