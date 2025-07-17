import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PqrsProyectarRespuestaComponent } from './pqrs-proyectar-respuesta.component';

describe('PqrsProyectarRespuestaComponent', () => {
  let component: PqrsProyectarRespuestaComponent;
  let fixture: ComponentFixture<PqrsProyectarRespuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PqrsProyectarRespuestaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PqrsProyectarRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
