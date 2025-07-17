/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppProvidersViewComponent } from './settings-app-providers-view.component';

describe('SettingsAppProvidersViewComponent', () => {
  let component: SettingsAppProvidersViewComponent;
  let fixture: ComponentFixture<SettingsAppProvidersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppProvidersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppProvidersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
