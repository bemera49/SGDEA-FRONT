/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppPollIndexComponent } from './settings-app-poll-index.component';

describe('SettingsAppPollIndexComponent', () => {
  let component: SettingsAppPollIndexComponent;
  let fixture: ComponentFixture<SettingsAppPollIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppPollIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppPollIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
