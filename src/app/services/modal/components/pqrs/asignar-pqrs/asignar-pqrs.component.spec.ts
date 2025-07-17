import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarPqrsComponent } from './asignar-pqrs.component';

describe('AsignarPqrsComponent', () => {
  let component: AsignarPqrsComponent;
  let fixture: ComponentFixture<AsignarPqrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarPqrsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsignarPqrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
