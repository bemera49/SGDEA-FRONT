/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppFilingTypesCreateComponent } from './settings-app-filing-types-create.component';

describe('SettingsAppFilingTypesCreateComponent', () => {
  let component: SettingsAppFilingTypesCreateComponent;
  let fixture: ComponentFixture<SettingsAppFilingTypesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppFilingTypesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppFilingTypesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
