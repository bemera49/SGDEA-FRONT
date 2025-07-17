/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppFilingLabelIndexComponent } from './settings-app-filing-label-index.component';

describe('SettingsAppFilingLabelIndexComponent', () => {
  let component: SettingsAppFilingLabelIndexComponent;
  let fixture: ComponentFixture<SettingsAppFilingLabelIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppFilingLabelIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppFilingLabelIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
