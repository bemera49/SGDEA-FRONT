import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PqrsPeticionIncompletaComponent } from './pqrs-peticion-incompleta.component';

describe('PqrsPeticionIncompletaComponent', () => {
  let component: PqrsPeticionIncompletaComponent;
  let fixture: ComponentFixture<PqrsPeticionIncompletaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PqrsPeticionIncompletaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PqrsPeticionIncompletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
