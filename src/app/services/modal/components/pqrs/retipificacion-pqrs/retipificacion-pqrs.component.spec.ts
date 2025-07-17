import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetipificacionPqrsComponent } from './retipificacion-pqrs.component';

describe('RetipificacionPqrsComponent', () => {
  let component: RetipificacionPqrsComponent;
  let fixture: ComponentFixture<RetipificacionPqrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RetipificacionPqrsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RetipificacionPqrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
