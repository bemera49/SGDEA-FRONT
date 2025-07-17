import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarSolicitudesHu13ConfirmComponent } from './asociar-solicitudes-hu13-confirm.component';

describe('AsociarSolicitudesHu13ConfirmComponent', () => {
  let component: AsociarSolicitudesHu13ConfirmComponent;
  let fixture: ComponentFixture<AsociarSolicitudesHu13ConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsociarSolicitudesHu13ConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsociarSolicitudesHu13ConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
