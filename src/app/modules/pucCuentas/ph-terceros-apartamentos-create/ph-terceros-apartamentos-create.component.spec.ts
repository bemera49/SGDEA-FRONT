import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhTercerosApartamentosCreateComponent } from './ph-terceros-apartamentos-create.component';

describe('PhTercerosApartamentosCreateComponent', () => {
  let component: PhTercerosApartamentosCreateComponent;
  let fixture: ComponentFixture<PhTercerosApartamentosCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhTercerosApartamentosCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhTercerosApartamentosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
