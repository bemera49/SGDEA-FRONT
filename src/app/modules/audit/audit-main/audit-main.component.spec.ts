/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditMainComponent } from './audit-main.component';

describe('AuditMainComponent', () => {
  let component: AuditMainComponent;
  let fixture: ComponentFixture<AuditMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
