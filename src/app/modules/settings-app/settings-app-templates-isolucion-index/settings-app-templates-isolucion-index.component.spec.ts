/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppTemplatesIsolucionIndexComponent } from './settings-app-templates-isolucion-index.component';

describe('SettingsAppTemplatesIsolucionIndexComponent', () => {
  let component: SettingsAppTemplatesIsolucionIndexComponent;
  let fixture: ComponentFixture<SettingsAppTemplatesIsolucionIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppTemplatesIsolucionIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppTemplatesIsolucionIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
