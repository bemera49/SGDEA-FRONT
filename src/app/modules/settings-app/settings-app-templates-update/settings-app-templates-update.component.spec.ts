/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppTemplatesUpdateComponent } from './settings-app-templates-update.component';

describe('SettingsAppTemplatesUpdateComponent', () => {
  let component: SettingsAppTemplatesUpdateComponent;
  let fixture: ComponentFixture<SettingsAppTemplatesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppTemplatesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppTemplatesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
