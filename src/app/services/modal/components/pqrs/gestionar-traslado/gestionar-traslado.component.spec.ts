import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarTrasladoComponent } from './gestionar-traslado.component';

describe('GestionarTrasladoComponent', () => {
  let component: GestionarTrasladoComponent;
  let fixture: ComponentFixture<GestionarTrasladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarTrasladoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarTrasladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
