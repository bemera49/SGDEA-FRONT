import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhTercerosApartamentosFormComponent } from './ph-terceros-apartamentos-form.component';

describe('PhTercerosApartamentosFormComponent', () => {
  let component: PhTercerosApartamentosFormComponent;
  let fixture: ComponentFixture<PhTercerosApartamentosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhTercerosApartamentosFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhTercerosApartamentosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
