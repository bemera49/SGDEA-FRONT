import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechazarPqrsComponent } from './rechazar-pqrs.component';

describe('RechazarPqrsComponent', () => {
  let component: RechazarPqrsComponent;
  let fixture: ComponentFixture<RechazarPqrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RechazarPqrsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RechazarPqrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
