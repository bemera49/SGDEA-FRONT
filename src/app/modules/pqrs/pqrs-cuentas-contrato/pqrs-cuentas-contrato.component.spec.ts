import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PqrsCuentasContratoComponent } from './pqrs-cuentas-contrato.component';

describe('PqrsCuentasContratoComponent', () => {
  let component: PqrsCuentasContratoComponent;
  let fixture: ComponentFixture<PqrsCuentasContratoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PqrsCuentasContratoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PqrsCuentasContratoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
