/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppRegionFormComponent } from './settings-app-region-form.component';

describe('SettingsAppRegionFormComponent', () => {
  let component: SettingsAppRegionFormComponent;
  let fixture: ComponentFixture<SettingsAppRegionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppRegionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppRegionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
