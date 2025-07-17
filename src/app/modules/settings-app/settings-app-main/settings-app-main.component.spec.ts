/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppMainComponent } from './settings-app-main.component';

describe('SettingsAppMainComponent', () => {
  let component: SettingsAppMainComponent;
  let fixture: ComponentFixture<SettingsAppMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
