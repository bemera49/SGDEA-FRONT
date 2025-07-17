/**

 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAsideNavBarComponent } from './admin-aside-nav-bar.component';

describe('AdminAsideNavBarComponent', () => {
  let component: AdminAsideNavBarComponent;
  let fixture: ComponentFixture<AdminAsideNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAsideNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAsideNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
