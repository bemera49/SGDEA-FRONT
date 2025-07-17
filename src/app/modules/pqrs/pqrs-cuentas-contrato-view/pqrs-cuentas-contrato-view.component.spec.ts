import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PqrsCuentasContratoViewComponent } from './pqrs-cuentas-contrato-view.component';

describe('PqrsCuentasContratoViewComponent', () => {
  let component: PqrsCuentasContratoViewComponent;
  let fixture: ComponentFixture<PqrsCuentasContratoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PqrsCuentasContratoViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PqrsCuentasContratoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
