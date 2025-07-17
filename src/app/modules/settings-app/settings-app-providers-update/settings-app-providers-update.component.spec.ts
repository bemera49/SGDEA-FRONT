/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppProvidersUpdateComponent } from './settings-app-providers-update.component';

describe('SettingsAppProvidersUpdateComponent', () => {
  let component: SettingsAppProvidersUpdateComponent;
  let fixture: ComponentFixture<SettingsAppProvidersUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppProvidersUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppProvidersUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
