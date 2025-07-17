import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarAutorizacionDevolucionComponent } from './solicitar-autorizacion-devolucion.component';

describe('SolicitarAutorizacionDevolucionComponent', () => {
  let component: SolicitarAutorizacionDevolucionComponent;
  let fixture: ComponentFixture<SolicitarAutorizacionDevolucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitarAutorizacionDevolucionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitarAutorizacionDevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
