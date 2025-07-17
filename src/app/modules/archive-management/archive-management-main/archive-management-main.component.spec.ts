/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveManagementMainComponent } from './archive-management-main.component';

describe('ArchiveManagementMainComponent', () => {
  let component: ArchiveManagementMainComponent;
  let fixture: ComponentFixture<ArchiveManagementMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveManagementMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveManagementMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
