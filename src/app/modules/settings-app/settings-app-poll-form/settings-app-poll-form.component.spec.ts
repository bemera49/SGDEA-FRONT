/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppPollFormComponent } from './settings-app-poll-form.component';

describe('SettingsAppPollFormComponent', () => {
  let component: SettingsAppPollFormComponent;
  let fixture: ComponentFixture<SettingsAppPollFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppPollFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppPollFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
