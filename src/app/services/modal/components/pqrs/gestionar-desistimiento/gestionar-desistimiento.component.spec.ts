import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarDesistimientoComponent } from './gestionar-desistimiento.component';

describe('GestionarDesistimientoComponent', () => {
  let component: GestionarDesistimientoComponent;
  let fixture: ComponentFixture<GestionarDesistimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarDesistimientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionarDesistimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
