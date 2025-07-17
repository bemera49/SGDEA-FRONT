import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAuthDocComponent } from './modal-auth-doc.component';

describe('ModalAuthDocComponent', () => {
  let component: ModalAuthDocComponent;
  let fixture: ComponentFixture<ModalAuthDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAuthDocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAuthDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
