import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSecurityComponent } from './modal-security.component';

describe('ModalSecurityComponent', () => {
  let component: ModalSecurityComponent;
  let fixture: ComponentFixture<ModalSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalSecurityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
