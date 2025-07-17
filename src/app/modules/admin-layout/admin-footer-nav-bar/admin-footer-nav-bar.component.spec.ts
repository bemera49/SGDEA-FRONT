/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFooterNavBarComponent } from './admin-footer-nav-bar.component';

describe('AdminFooterNavBarComponent', () => {
  let component: AdminFooterNavBarComponent;
  let fixture: ComponentFixture<AdminFooterNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFooterNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFooterNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
