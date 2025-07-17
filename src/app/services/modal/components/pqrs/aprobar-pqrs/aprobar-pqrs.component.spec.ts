import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobarPqrsComponent } from './aprobar-pqrs.component';

describe('AprobarPqrsComponent', () => {
  let component: AprobarPqrsComponent;
  let fixture: ComponentFixture<AprobarPqrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AprobarPqrsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AprobarPqrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
