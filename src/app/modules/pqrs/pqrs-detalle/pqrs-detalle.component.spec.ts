import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PqrsDetalleComponent } from './pqrs-detalle.component';

describe('PqrsDetalleComponent', () => {
  let component: PqrsDetalleComponent;
  let fixture: ComponentFixture<PqrsDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PqrsDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PqrsDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
