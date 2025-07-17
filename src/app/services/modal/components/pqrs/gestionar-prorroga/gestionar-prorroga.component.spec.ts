import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarProrrogaComponent } from './gestionar-prorroga.component';

describe('GestionarProrrogaComponent', () => {
  let component: GestionarProrrogaComponent;
  let fixture: ComponentFixture<GestionarProrrogaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionarProrrogaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionarProrrogaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
