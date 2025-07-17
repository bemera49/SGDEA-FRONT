/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppFilingTypesUpdateComponent } from './settings-app-filing-types-update.component';

describe('SettingsAppFilingTypesUpdateComponent', () => {
  let component: SettingsAppFilingTypesUpdateComponent;
  let fixture: ComponentFixture<SettingsAppFilingTypesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppFilingTypesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppFilingTypesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
