/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditLogViewComponent } from './audit-log-view.component';

describe('AuditLogViewComponent', () => {
  let component: AuditLogViewComponent;
  let fixture: ComponentFixture<AuditLogViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditLogViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditLogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
