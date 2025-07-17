import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasificacionInternaComponent } from './clasificacion-interna.component';

describe('ClasificacionInternaComponent', () => {
  let component: ClasificacionInternaComponent;
  let fixture: ComponentFixture<ClasificacionInternaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClasificacionInternaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClasificacionInternaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
