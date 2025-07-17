/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppTimesResponseIndexComponent } from './settings-app-times-response-index.component';

describe('SettingsAppTimesResponseIndexComponent', () => {
  let component: SettingsAppTimesResponseIndexComponent;
  let fixture: ComponentFixture<SettingsAppTimesResponseIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppTimesResponseIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppTimesResponseIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
