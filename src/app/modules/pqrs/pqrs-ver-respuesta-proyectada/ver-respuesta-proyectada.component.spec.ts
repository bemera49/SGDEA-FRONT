import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerRespuestaProyectadaComponent } from './ver-respuesta-proyectada.component';

describe('VerRespuestaProyectadaComponent', () => {
  let component: VerRespuestaProyectadaComponent;
  let fixture: ComponentFixture<VerRespuestaProyectadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerRespuestaProyectadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerRespuestaProyectadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
