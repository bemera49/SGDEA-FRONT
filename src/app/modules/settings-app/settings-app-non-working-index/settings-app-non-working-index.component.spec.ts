/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppNonWorkingIndexComponent } from './settings-app-non-working-index.component';

describe('SettingsAppNonWorkingIndexComponent', () => {
  let component: SettingsAppNonWorkingIndexComponent;
  let fixture: ComponentFixture<SettingsAppNonWorkingIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppNonWorkingIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppNonWorkingIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
