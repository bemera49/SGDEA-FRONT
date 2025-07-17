import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarRadicadoComponent } from './aprobar-radicado.component';

describe('AprobarRadicadoComponent', () => {
  let component: AprobarRadicadoComponent;
  let fixture: ComponentFixture<AprobarRadicadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AprobarRadicadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprobarRadicadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
