import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PucCuentasUpdateComponent } from './puc-cuentas-update.component';

describe('PucCuentasUpdateComponent', () => {
  let component: PucCuentasUpdateComponent;
  let fixture: ComponentFixture<PucCuentasUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PucCuentasUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PucCuentasUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
