/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsAppDocumentaryTypesComponent } from './settings-app-documentary-types.component';

describe('SettingsAppDocumentaryTypesComponent', () => {
  let component: SettingsAppDocumentaryTypesComponent;
  let fixture: ComponentFixture<SettingsAppDocumentaryTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsAppDocumentaryTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsAppDocumentaryTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
