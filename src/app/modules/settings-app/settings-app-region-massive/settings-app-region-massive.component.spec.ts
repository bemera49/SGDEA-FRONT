/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppRegionMassiveComponent } from './settings-app-region-massive.component';

describe('SettingsAppRegionMassiveComponent', () => {
  let component: SettingsAppRegionMassiveComponent;
  let fixture: ComponentFixture<SettingsAppRegionMassiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppRegionMassiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppRegionMassiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
