import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolverSolicitudComponent } from './devolver-solicitud.component';

describe('DevolverSolicitudComponent', () => {
  let component: DevolverSolicitudComponent;
  let fixture: ComponentFixture<DevolverSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevolverSolicitudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevolverSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
