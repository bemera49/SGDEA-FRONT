/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppRegionIndexComponent } from './settings-app-region-index.component';

describe('SettingsAppRegionIndexComponent', () => {
  let component: SettingsAppRegionIndexComponent;
  let fixture: ComponentFixture<SettingsAppRegionIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppRegionIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppRegionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
