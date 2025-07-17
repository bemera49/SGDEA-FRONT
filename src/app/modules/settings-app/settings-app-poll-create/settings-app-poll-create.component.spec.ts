/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppPollCreateComponent } from './settings-app-poll-create.component';

describe('SettingsAppPollCreateComponent', () => {
  let component: SettingsAppPollCreateComponent;
  let fixture: ComponentFixture<SettingsAppPollCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppPollCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppPollCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
