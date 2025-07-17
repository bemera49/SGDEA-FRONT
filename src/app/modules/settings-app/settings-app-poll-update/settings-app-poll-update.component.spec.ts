/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppPollUpdateComponent } from './settings-app-poll-update.component';

describe('SettingsAppPollUpdateComponent', () => {
  let component: SettingsAppPollUpdateComponent;
  let fixture: ComponentFixture<SettingsAppPollUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppPollUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppPollUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
