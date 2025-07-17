/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditLogIndexComponent } from './audit-log-index.component';

describe('AuditLogIndexComponent', () => {
  let component: AuditLogIndexComponent;
  let fixture: ComponentFixture<AuditLogIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditLogIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditLogIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
