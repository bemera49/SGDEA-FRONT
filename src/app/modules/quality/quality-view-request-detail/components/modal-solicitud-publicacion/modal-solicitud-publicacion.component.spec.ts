import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSolicitudPublicacionComponent } from './modal-solicitud-publicacion.component';

describe('ModalSolicitudPublicacionComponent', () => {
  let component: ModalSolicitudPublicacionComponent;
  let fixture: ComponentFixture<ModalSolicitudPublicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSolicitudPublicacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalSolicitudPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
