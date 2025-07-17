import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingAppTimeRequestIndexComponent } from './settings-app-time-request-index.component';

describe('SettingAppTimeRequestIndexComponent', () => {
  let component: SettingAppTimeRequestIndexComponent;
  let fixture: ComponentFixture<SettingAppTimeRequestIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingAppTimeRequestIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingAppTimeRequestIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
