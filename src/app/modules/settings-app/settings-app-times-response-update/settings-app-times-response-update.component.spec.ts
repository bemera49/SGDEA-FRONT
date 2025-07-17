/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppTimesResponseUpdateComponent } from './settings-app-times-response-update.component';

describe('SettingsAppTimesResponseUpdateComponent', () => {
  let component: SettingsAppTimesResponseUpdateComponent;
  let fixture: ComponentFixture<SettingsAppTimesResponseUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppTimesResponseUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppTimesResponseUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
