import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhTercerosApartamentosViewComponent } from './ph-terceros-apartamentos-view.component';

describe('PhTercerosApartamentosViewComponent', () => {
  let component: PhTercerosApartamentosViewComponent;
  let fixture: ComponentFixture<PhTercerosApartamentosViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhTercerosApartamentosViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhTercerosApartamentosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
