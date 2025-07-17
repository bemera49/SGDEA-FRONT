/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppRegionUpdateComponent } from './settings-app-region-update.component';

describe('SettingsAppRegionUpdateComponent', () => {
  let component: SettingsAppRegionUpdateComponent;
  let fixture: ComponentFixture<SettingsAppRegionUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppRegionUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppRegionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
