/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrespondenceManagementMainComponent } from './correspondence-management-main.component';

describe('CorrespondenceManagementMainComponent', () => {
  let component: CorrespondenceManagementMainComponent;
  let fixture: ComponentFixture<CorrespondenceManagementMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrespondenceManagementMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrespondenceManagementMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
