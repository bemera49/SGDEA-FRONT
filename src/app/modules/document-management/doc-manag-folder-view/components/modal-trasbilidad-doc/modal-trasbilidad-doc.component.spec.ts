import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTrasbilidadDocComponent } from './modal-trasbilidad-doc.component';

describe('ModalTrasbilidadDocComponent', () => {
  let component: ModalTrasbilidadDocComponent;
  let fixture: ComponentFixture<ModalTrasbilidadDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalTrasbilidadDocComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalTrasbilidadDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
