import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarSolicitudesHu13Component } from './asociar-solicitudes-hu13.component';

describe('AsociarSolicitudesHu13Component', () => {
  let component: AsociarSolicitudesHu13Component;
  let fixture: ComponentFixture<AsociarSolicitudesHu13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsociarSolicitudesHu13Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsociarSolicitudesHu13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
