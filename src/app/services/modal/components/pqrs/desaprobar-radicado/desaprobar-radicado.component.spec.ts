import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesaprobarRadicadoComponent } from './desaprobar-radicado.component';

describe('DesaprobarRadicadoComponent', () => {
  let component: DesaprobarRadicadoComponent;
  let fixture: ComponentFixture<DesaprobarRadicadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DesaprobarRadicadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesaprobarRadicadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
