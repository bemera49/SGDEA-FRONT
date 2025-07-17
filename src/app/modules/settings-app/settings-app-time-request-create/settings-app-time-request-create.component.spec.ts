import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingAppCreateTimeRequestComponent } from './settings-app-time-request-create.component';

describe('SettingAppCreateTimeRequestComponent', () => {
  let component: SettingAppCreateTimeRequestComponent;
  let fixture: ComponentFixture<SettingAppCreateTimeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingAppCreateTimeRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingAppCreateTimeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
