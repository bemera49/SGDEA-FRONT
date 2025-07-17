import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuAsideNavComponent } from './admin-menu-aside-nav.component';

describe('AdminMenuAsideNavComponent', () => {
  let component: AdminMenuAsideNavComponent;
  let fixture: ComponentFixture<AdminMenuAsideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMenuAsideNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminMenuAsideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
