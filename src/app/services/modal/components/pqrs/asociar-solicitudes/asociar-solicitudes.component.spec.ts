import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociarSolicitudesComponent } from './asociar-solicitudes.component';

describe('AsociarSolicitudesComponent', () => {
  let component: AsociarSolicitudesComponent;
  let fixture: ComponentFixture<AsociarSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsociarSolicitudesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsociarSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
