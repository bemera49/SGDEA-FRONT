import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectarRespuestaFormComponent } from './proyectar-respuesta-form.component';

describe('ProyectarRespuestaFormComponent', () => {
  let component: ProyectarRespuestaFormComponent;
  let fixture: ComponentFixture<ProyectarRespuestaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectarRespuestaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProyectarRespuestaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
