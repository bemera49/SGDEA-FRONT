/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppTimesResponseFormComponent } from './settings-app-times-response-form.component';

describe('SettingsAppTimesResponseFormComponent', () => {
  let component: SettingsAppTimesResponseFormComponent;
  let fixture: ComponentFixture<SettingsAppTimesResponseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppTimesResponseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppTimesResponseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
