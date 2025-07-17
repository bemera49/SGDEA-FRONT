/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppNonWorkingCreateComponent } from './settings-app-non-working-create.component';

describe('SettingsAppNonWorkingCreateComponent', () => {
  let component: SettingsAppNonWorkingCreateComponent;
  let fixture: ComponentFixture<SettingsAppNonWorkingCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppNonWorkingCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppNonWorkingCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
