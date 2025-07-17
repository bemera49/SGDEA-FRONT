import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PqrsListadoComponent } from './pqrs-listado.component';

describe('PqrsListadoComponent', () => {
  let component: PqrsListadoComponent;
  let fixture: ComponentFixture<PqrsListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PqrsListadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PqrsListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
