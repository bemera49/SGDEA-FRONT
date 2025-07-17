import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProrrogaPrestamoDocComponent } from './prorroga-prestamo-doc.component';

describe('ProrrogaPrestamoDocComponent', () => {
  let component: ProrrogaPrestamoDocComponent;
  let fixture: ComponentFixture<ProrrogaPrestamoDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProrrogaPrestamoDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProrrogaPrestamoDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
