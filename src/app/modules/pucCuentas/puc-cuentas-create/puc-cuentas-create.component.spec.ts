import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PucCuentasCreateComponent } from './puc-cuentas-create.component';

describe('PucCuentasCreateComponent', () => {
  let component: PucCuentasCreateComponent;
  let fixture: ComponentFixture<PucCuentasCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PucCuentasCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PucCuentasCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
