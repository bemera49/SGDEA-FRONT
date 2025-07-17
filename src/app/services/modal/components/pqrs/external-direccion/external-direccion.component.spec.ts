import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalDireccionComponent } from './external-direccion.component';

describe('ExternalDireccionComponent', () => {
  let component: ExternalDireccionComponent;
  let fixture: ComponentFixture<ExternalDireccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExternalDireccionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExternalDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
