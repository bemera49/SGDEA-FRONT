/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppTimesResponseViewComponent } from './settings-app-times-response-view.component';

describe('SettingsAppTimesResponseViewComponent', () => {
  let component: SettingsAppTimesResponseViewComponent;
  let fixture: ComponentFixture<SettingsAppTimesResponseViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppTimesResponseViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppTimesResponseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
