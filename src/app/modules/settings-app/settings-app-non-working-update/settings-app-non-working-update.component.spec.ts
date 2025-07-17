/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppNonWorkingUpdateComponent } from './settings-app-non-working-update.component';

describe('SettingsAppNonWorkingUpdateComponent', () => {
  let component: SettingsAppNonWorkingUpdateComponent;
  let fixture: ComponentFixture<SettingsAppNonWorkingUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppNonWorkingUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppNonWorkingUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
