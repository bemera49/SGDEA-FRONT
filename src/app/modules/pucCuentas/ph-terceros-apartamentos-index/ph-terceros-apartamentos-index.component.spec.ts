import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhTercerosApartamentosIndexComponent } from './ph-terceros-apartamentos-index.component';

describe('PhTercerosApartamentosIndexComponent', () => {
  let component: PhTercerosApartamentosIndexComponent;
  let fixture: ComponentFixture<PhTercerosApartamentosIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhTercerosApartamentosIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhTercerosApartamentosIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
