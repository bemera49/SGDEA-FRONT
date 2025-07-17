/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppPollViewComponent } from './settings-app-poll-view.component';

describe('SettingsAppPollViewComponent', () => {
  let component: SettingsAppPollViewComponent;
  let fixture: ComponentFixture<SettingsAppPollViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppPollViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppPollViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
