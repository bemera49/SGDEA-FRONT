import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTopNavAlfrescoComponent } from './admin-top-nav-alfresco.component';

describe('AdminTopNavAlfrescoComponent', () => {
  let component: AdminTopNavAlfrescoComponent;
  let fixture: ComponentFixture<AdminTopNavAlfrescoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTopNavAlfrescoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTopNavAlfrescoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
