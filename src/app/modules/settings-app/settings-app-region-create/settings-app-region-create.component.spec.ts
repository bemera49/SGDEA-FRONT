/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppRegionCreateComponent } from './settings-app-region-create.component';

describe('SettingsAppRegionCreateComponent', () => {
  let component: SettingsAppRegionCreateComponent;
  let fixture: ComponentFixture<SettingsAppRegionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppRegionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppRegionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
