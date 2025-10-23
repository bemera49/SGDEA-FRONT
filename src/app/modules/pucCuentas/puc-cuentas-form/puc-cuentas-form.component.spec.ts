import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PucCuentasFormComponent } from './puc-cuentas-form.component';

describe('PucCuentasFormComponent', () => {
  let component: PucCuentasFormComponent;
  let fixture: ComponentFixture<PucCuentasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PucCuentasFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PucCuentasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
